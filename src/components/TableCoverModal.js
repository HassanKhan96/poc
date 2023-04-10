import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, Card, Modal, Portal} from 'react-native-paper';
import coverTableStyles from '../screens/cover-table/styles';
import globalColors from '../styles/colors';
import CounterField from '../components/CounterField';
import {realmContext} from '../context/RealmContext';
import {useUser} from '@realm/react';
import {Order} from '../schema/orderSchema';

const TableCoverModal = ({visible, onDismiss, table = null}) => {
  const [coverCount, setCoverCount] = useState(0);
  const navigation = useNavigation();
  const {useRealm, useQuery} = realmContext;
  const realm = useRealm();
  const user = useUser();

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(Order), {name: 'Orders'});
    });
  }, [realm, user]);

  const onCover = (tableId, coverCount) => {
    if (coverCount > 0) {
      realm.syncSession.pause();
      realm.write(() => {
        let order = realm.create('Orders', {
          tableId,
          cover: coverCount,
          userId: user.id,
        });
        onDismiss();
        navigation.navigate('Cover', {
          name: table?.title,
          table,
          order,
        });
      });

      setCoverCount(0);
    }
  };
  return (
    <Portal>
      <Modal
        style={{marginHorizontal: 20}}
        visible={visible}
        onDismiss={onDismiss}>
        <Card style={coverTableStyles.coverFieldContainer}>
          <Card.Title title="Cover Table" titleVariant="titleMedium" />
          <View style={coverTableStyles.coverInput}>
            <CounterField count={coverCount} onChange={setCoverCount} />
          </View>
          <View style={{margin: 20}}>
            {coverCount === 0 ? (
              <Button mode="contained" buttonColor={globalColors.danger}>
                Close
              </Button>
            ) : (
              <Button
                mode="contained"
                onPress={() => onCover(table?._id.toHexString(), coverCount)}>
                Cover
              </Button>
            )}
          </View>
        </Card>
      </Modal>
    </Portal>
  );
};

export default TableCoverModal;
