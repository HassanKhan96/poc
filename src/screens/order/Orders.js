import { useUser } from '@realm/react';
import { FlatList, View} from 'react-native'
import { realmContext } from '../../context/RealmContext';
import defaultStyles from '../../styles/defualt.styles';
import {Order} from '../../schema/orderSchema'
import orderStyles from './styles';
import { Card, Text } from 'react-native-paper';
import globalColors from '../../styles/colors';
import { Table } from '../../schema/tableSchema';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
const Orders = () => {
  const { useQuery, useRealm } = realmContext
  const navigation = useNavigation()
  const user = useUser()
  const realm = useRealm()
  const orders = useQuery(Order).filtered('userId == $0 SORT(status DESC)', user.id)
  

  return <View style={[defaultStyles.container, orderStyles.ordersContainer]}>
    <FlatList
    contentContainerStyle={{ paddingBottom: 20}}
      data={orders}
      key={order => order._id.toHexString()}
      renderItem={({item, index}) => {
        
        let table = realm.objectForPrimaryKey(Table, new Realm.BSON.ObjectId(item.tableId))
        return(
        <Card style={orderStyles.itemsContainer} onPress={() => {
          console.log(item._id)
          navigation.navigate('Cover', {
            name: table?.title,
            table,
            order: item,
          });
        }}>
          <Text style={{ marginHorizontal: 15, marginTop: 15, color: globalColors.gray800}} variant='titleLarge'>Table: {table?.title}</Text>
        <Card.Content>
          <View style={orderStyles.itemAmountRow}>
            <Text variant="titleMedium" style={orderStyles.itemAmountTitle}>
              Bill Amount
            </Text>
            <Text
              variant="titleMedium"
              style={{ fontWeight: '500', color: globalColors.gray800 }}>
              £ {item?.billAmount}
            </Text>
          </View>
          <View style={orderStyles.itemAmountRow}>
            <Text variant="titleMedium" style={orderStyles.itemAmountTitle}>
              Discount Applied
            </Text>
            <Text
              variant="titleMedium"
              style={{ fontWeight: '500', color: globalColors.gray800 }}>
              £ {item.discount}
            </Text>
          </View>
          <View style={orderStyles.itemAmountRow}>
            <Text variant="titleMedium" style={orderStyles.itemAmountTitle}>
              Amount Received
            </Text>
            <Text
              variant="titleMedium"
              style={{ fontWeight: '500', color: globalColors.gray800 }}>
              £ {item?.amountReceived}
            </Text>
          </View>
          <View style={orderStyles.itemAmountRow}>
            <Text variant="titleMedium" style={orderStyles.itemAmountTitle}>
              Amount Payable
            </Text>
            <Text
              variant="titleMedium"
              style={{ fontWeight: '500', color: globalColors.gray800 }}>
              £ {item.amountPayable}
            </Text>
          </View>
         <View style={orderStyles.itemFooter}>
          <View style={{ flexDirection: 'row'}}>
            <Text style={{color:globalColors.gray800}}>Status: </Text>
            <Text style={{ color: item.status =='closed'? globalColors.danger: globalColors.success}}>{item.status}</Text>
            
          </View>
          <View>
            <Text style={{color:globalColors.gray800}}>Date: {moment(item.createdAt).format('DD/MM/YY')}</Text>
          </View>
         </View>
        </Card.Content>
      </Card>
        )
      }}
    />
  </View>
};

export default Orders;
