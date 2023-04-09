import {useContext, memo, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Button, Card, Dialog, Portal, Text} from 'react-native-paper';
import TabButton from '../../../components/TabButton';
import OrderContext from '../../../context/orderContext';
import globalColors from '../../../styles/colors';
import defaultStyles from '../../../styles/defualt.styles';
import itemsTabStyle from './styles';
import {realmContext} from '../../../context/RealmContext';
import {useUser} from '@realm/react';
import {Order} from '../../../schema/orderSchema';
import {Table} from '../../../schema/tableSchema';
import {useNavigation} from '@react-navigation/native';
import UpdateOrderItem from './UpdateOrderItem';
import OrderPayment from './OrderPayment';
import OrderDiscount from './OrderDiscount';
import AlertDialog from '../../../components/AlertDialog';

const Items = () => {
  const {useRealm, useQuery} = realmContext;
  const realm = useRealm();
  const user = useUser();
  const navigation = useNavigation();
  const {order, setOrder} = useContext(OrderContext);
  const [showItemUpdateModal, setShowItemUpdateModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [alert, setAlert] = useState({message: '', status: false});
  const [itemData, setItemData] = useState(null);
  let newOrder = useQuery(Order).filtered(
    `_id == $0 AND tableId == "${order.tableId}" AND userId == "${user.id}"`,
    order.orderId,
  )[0];

  let orderTable = realm.objectForPrimaryKey(Table, order.tableId);

  const updateItem = item => {
    try {
      realm.write(() => {
        let existingItem = newOrder.items.filtered(
          'item._id == $0',
          item.item._id,
        )[0];
        let oldQuantity = existingItem.quantity;
        existingItem.quantity = item.quantity;
        let amount = Math.abs(oldQuantity - item.quantity) * item.item.price;
        if (oldQuantity < item.quantity) {
          newOrder.billAmount += amount;
          newOrder.amountPayable += amount;
        } else {
          newOrder.billAmount -= amount;
          newOrder.amountPayable -= amount;
        }
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
        let table = realm.objectForPrimaryKey(Table, order.tableId);
        if (!table) return console.log('table not found');
        newOrder.isConfirmed = true;
        table.orders.push(newOrder);
        realm.syncSession.resume();
        navigation.goBack();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onPay = amount => {
    try {
      realm.write(() => {
        newOrder.amountReceived += Number(amount);
        newOrder.amountPayable -= Number(amount);
      });
      setShowPaymentModal(false);
      setItemData(null);
    } catch (error) {
      console.log(error);
    }
  };

  const onDiscount = amount => {
    try {
      realm.write(() => {
        newOrder.discount = amount;
        newOrder.amountPayable -= amount;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const closeOrder = () => {
    try {
      realm.write(() => {
        newOrder.status = 'closed';
        orderTable.orders = orderTable
          .toJSON()
          .orders.filter(
            order => order._id.toHexString() !== newOrder._id.toHexString(),
          );
      });
      setAlert({message: '', status: false});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={[defaultStyles.container, itemsTabStyle.container]}>
      <UpdateOrderItem
        showModal={showItemUpdateModal}
        setShowModal={setShowItemUpdateModal}
        itemData={itemData}
        setItemData={setItemData}
        saveItem={updateItem}
      />
      <OrderPayment
        showModal={showPaymentModal}
        setShowModal={setShowPaymentModal}
        itemData={itemData}
        setItemData={setItemData}
        saveItem={onPay}
      />
      <OrderDiscount
        showModal={showDiscountModal}
        setShowModal={setShowDiscountModal}
        itemData={itemData}
        setItemData={setItemData}
        saveItem={onDiscount}
      />

      <AlertDialog
        title={'Close Order'}
        message={alert.message}
        visible={alert.status}
        onConfirm={closeOrder}
        onDiscard={() => setAlert({message: '', status: false})}
      />
      <Card style={itemsTabStyle.itemsContainer}>
        <Card.Content>
          <View style={itemsTabStyle.itemAmountRow}>
            <Text variant="titleMedium" style={itemsTabStyle.itemAmountTitle}>
              Bill Amount
            </Text>
            <Text
              variant="titleMedium"
              style={{fontWeight: '500', color: globalColors.gray800}}>
              £ {newOrder?.billAmount}
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
              £ {newOrder?.amountReceived}
            </Text>
          </View>
          <View style={itemsTabStyle.itemAmountRow}>
            <Text variant="titleMedium" style={itemsTabStyle.itemAmountTitle}>
              Amount Payable
            </Text>
            <Text
              variant="titleMedium"
              style={{fontWeight: '500', color: globalColors.gray800}}>
              £ {newOrder.amountPayable}
            </Text>
          </View>
          {/* <Text>No Items selected</Text> */}

          <View style={itemsTabStyle.bottomBar}>
            <TabButton
              name="send"
              title="Confirm"
              onPress={() => confirmOrder()}
              disabled={newOrder?.isConfirmed && newOrder?.items?.length}
            />
            <TabButton
              name="printer"
              title="Print"
              disabled={!newOrder.isConfirmed}
            />
            <TabButton
              name="tag"
              title="Discount"
              onPress={() => {
                setShowDiscountModal(true);
                setItemData(newOrder);
              }}
              disabled={
                !newOrder.isConfirmed ||
                newOrder.amountPayable == 0 ||
                newOrder.status == 'closed'
              }
            />
            <TabButton
              name="credit-card"
              title="Payment"
              onPress={() => {
                setShowPaymentModal(true);
                setItemData(newOrder);
              }}
              disabled={
                !newOrder.isConfirmed ||
                newOrder.amountPayable == 0 ||
                newOrder.status == 'closed'
              }
            />
            <TabButton
              name="logout"
              title="Close"
              onPress={() =>
                setAlert({
                  message: 'Are you sure you want to close order?',
                  status: true,
                })
              }
              disabled={
                (!newOrder.isConfirmed || newOrder.status === 'closed') &&
                newOrder.amountPayable >= 0
              }
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
                    setShowItemUpdateModal(true);
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
