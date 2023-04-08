import {useContext, memo, useState} from 'react';
import {Pressable, TouchableOpacity, View} from 'react-native';
import {
  Appbar,
  Button,
  Card,
  IconButton,
  Modal,
  Portal,
  Text,
} from 'react-native-paper';
import CounterField from '../../../components/CounterField';
import TabButton from '../../../components/TabButton';
import OrderContext from '../../../context/orderContext';
import globalColors from '../../../styles/colors';
import defaultStyles from '../../../styles/defualt.styles';
import coverTableStyles from '../styles';
import itemsTabStyle from './styles';
import {realmContext} from '../../../context/RealmContext';
import {useUser} from '@realm/react';
import {Order} from '../../../schema/orderSchema';
import {BSON} from 'realm';

const Items = () => {
  const {useRealm, useQuery} = realmContext;
  const realm = useRealm();
  const user = useUser();
  const {order, setOrder} = useContext(OrderContext);
  const [showModal, setShowModal] = useState(false);
  const [itemData, setItemData] = useState(null);
  let newOrder = useQuery(Order).filtered(
    `_id == $0 AND tableId == "${order.tableId}" AND userId == "${user.id}"`,
    order.orderId,
  )[0];

  const updateItem = item => {
    try {
      realm.write(() => {
        let existingItem = newOrder.items.filtered(
          'item._id == $0',
          item.item._id,
        )[0];
        let oldQuantity = existingItem.quantity;
        existingItem.quantity = item.quantity;
        newOrder.billAmount +=
          Math.abs(oldQuantity - item.quantity) * item.item.price;
      });
      setShowModal(false);
      setItemData(null);
    } catch (error) {
      console.log(error);
    }
  };

  const confirmOrder = () => {
    try {
      realm.write(() => {
        newOrder.isConfirmed = true;
        realm.syncSession.resume();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={[defaultStyles.container, itemsTabStyle.container]}>
      <Portal>
        <Modal
          visible={showModal}
          style={itemsTabStyle.editItemModal}
          onDismiss={() => null}>
          <Appbar.Header>
            <Appbar.BackAction
              onPress={() => {
                setShowModal(false);
                setItemData(null);
              }}
            />
            <Appbar.Content title="Edit Item" />
          </Appbar.Header>
          <View style={itemsTabStyle.editItemModalBody}>
            <View style={itemsTabStyle.editItemContainer}>
              <View style={itemsTabStyle.editItemCounter}>
                <Text variant="titleMedium">Quantity</Text>
                <CounterField
                  count={itemData?.quantity}
                  onChange={v => setItemData(prev => ({...prev, quantity: v}))}
                />
              </View>
            </View>
            <View>
              <Button mode="contained" onPress={() => updateItem(itemData)}>
                Save
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
      <Card style={itemsTabStyle.itemsContainer}>
        <Card.Content>
          <View style={itemsTabStyle.itemAmountRow}>
            <Text variant="titleMedium" style={itemsTabStyle.itemAmountTitle}>
              Bill Amount
            </Text>
            <Text
              variant="titleMedium"
              style={{fontWeight: '500', color: globalColors.gray800}}>
              £ {newOrder.billAmount}
            </Text>
          </View>
          <View style={itemsTabStyle.itemAmountRow}>
            <Text variant="titleMedium" style={itemsTabStyle.itemAmountTitle}>
              Discount Applied
            </Text>
            <Text
              variant="titleMedium"
              style={{fontWeight: '500', color: globalColors.gray800}}>
              £ 0.00
            </Text>
          </View>
          <View style={itemsTabStyle.itemAmountRow}>
            <Text variant="titleMedium" style={itemsTabStyle.itemAmountTitle}>
              Amount Received
            </Text>
            <Text
              variant="titleMedium"
              style={{fontWeight: '500', color: globalColors.gray800}}>
              £ {newOrder.amountReceived}
            </Text>
          </View>
          <View style={itemsTabStyle.itemAmountRow}>
            <Text variant="titleMedium" style={itemsTabStyle.itemAmountTitle}>
              Amount Payable
            </Text>
            <Text
              variant="titleMedium"
              style={{fontWeight: '500', color: globalColors.gray800}}>
              £ {newOrder.billAmount - newOrder.amountReceived}
            </Text>
          </View>
          {/* <Text>No Items selected</Text> */}

          <View style={itemsTabStyle.bottomBar}>
            <TabButton
              name="send"
              title="Confirm"
              onPress={() => confirmOrder()}
              disabled={newOrder.isConfirmed && !newOrder.items.length}
            />
            <TabButton
              name="printer"
              title="Print"
              disabled={!newOrder.isConfirmed}
            />
            <TabButton
              name="tag"
              title="Discount"
              disabled={!newOrder.isConfirmed}
            />
            <TabButton
              name="credit-card"
              title="Payment"
              disabled={!newOrder.isConfirmed}
            />
            <TabButton
              name="logout"
              title="Close"
              disabled={!newOrder.isConfirmed}
            />
          </View>
        </Card.Content>
      </Card>
      {newOrder.items.length ? (
        <Card style={itemsTabStyle.itemsContainer}>
          <Card.Content>
            {newOrder.items.map((i, ind) => {
              return (
                <TouchableOpacity
                  key={ind + Math.random()}
                  onPress={() => {
                    setShowModal(true);
                    setItemData(i.toJSON());
                  }}>
                  <View
                    style={[
                      itemsTabStyle.itemAmountRow,
                      {paddingVertical: 15},
                    ]}>
                    <Text
                      variant="titleMedium"
                      style={itemsTabStyle.itemAmountTitle}>
                      {i.quantity} x {i.item.name}
                    </Text>
                    <Text
                      variant="titleMedium"
                      style={{fontWeight: '500', color: globalColors.gray800}}>
                      £ {parseFloat(i.item.price * i.quantity).toFixed(2)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </Card.Content>
        </Card>
      ) : null}
    </View>
  );
};

export default memo(Items);
