import {useContext, memo} from 'react';
import {Pressable, Touchable, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Card, IconButton, Text} from 'react-native-paper';
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
  const items = [
    {item: 'Biryani', quatity: 2, price: 8},
    {item: 'Club Sandwich', quatity: 1, price: 5},
    {item: 'Biryani', quatity: 3, price: 20},
  ];
  const {useRealm, useQuery} = realmContext;

  const realm = useRealm();
  const user = useUser();
  const {order, setOrder} = useContext(OrderContext);
  let newOrder = useQuery(Order).filtered(
    `_id == $0 AND tableId == "${order.tableId}" AND userId == "${user.id}"`,
    order.orderId,
  )[0];

  return (
    <View style={[defaultStyles.container, itemsTabStyle.container]}>
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
            <TabButton name="send" title="Confirm" />
            <TabButton name="printer" title="Print" />
            <TabButton name="tag" title="Discount" />
            <TabButton name="credit-card" title="Payment" />
            <TabButton name="logout" title="Close" />
          </View>
        </Card.Content>
      </Card>
      <Card style={itemsTabStyle.itemsContainer}>
        <Card.Content>
          {newOrder.items.map((i, ind) => {
            return (
              <Pressable key={ind + Math.random()}>
                <View
                  style={[itemsTabStyle.itemAmountRow, {paddingVertical: 15}]}>
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
              </Pressable>
            );
          })}
        </Card.Content>
      </Card>
    </View>
  );
};

export default memo(Items);
