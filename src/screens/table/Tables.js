import {useUser} from '@realm/react';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import globalColors from '../../styles/colors';
import styles from '../../styles/defualt.styles';
import TableComponent from './TableComponent';
import {realmContext} from '../../context/RealmContext';
import {Table} from '../../schema/tableSchema';
import AddTableModal from '../../components/AddTableModal';
import TableOptionsModal from '../../components/TableOptionsModal';
import UpdateTableModal from '../../components/UpdateTableModal';
import TableCoverModal from '../../components/TableCoverModal';
import {useNavigation} from '@react-navigation/native';
import ProfileContext from '../../context/profileContext';
const Tables = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState({
    status: false,
    table: null,
  });
  const [updateModal, setUpdateModal] = useState({status: false, table: null});
  const [showCoverModal, setShowCoverModal] = useState({
    status: false,
    table: null,
  });
  const {useRealm, useQuery} = realmContext;
  const user = useUser();
  const realm = useRealm();
  const navigation = useNavigation();
  const {profile} = useContext(ProfileContext);

  const tables = useQuery(Table)
    .filtered(`userId == "${user?.id}"`)
    .sorted('_id');

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(Table), {name: 'tables'});
    });
  }, [realm, user]);

  const addTable = useCallback(
    title => {
      realm.write(() => {
        realm.create(
          'Table',
          {
            userId: user?.id,
            title,
          },
          true,
        );
      });
      setShowAddModal(false);
    },
    [realm, user],
  );

  const deleteTable = useCallback(
    id => {
      const table = realm.objectForPrimaryKey(Table, id);
      if (table) {
        realm.write(() => {
          realm.delete(table);
        });
      }
      setShowOptionsModal({status: false, id: ''});
    },
    [realm, user],
  );

  const updateTable = useCallback(
    (id, title) => {
      const table = realm.objectForPrimaryKey(Table, id);
      if (table) {
        realm.write(() => {
          table.title = title;
        });
        setShowOptionsModal({table: null});
        setUpdateModal({status: false, table: null});
      }
    },
    [realm, user],
  );

  const onCardPress = (table, order) => {
    if (order && order.isConfirmed) {
      navigation.navigate('Cover', {
        name: table?.title,
        table,
        order,
      });
    } else {
      setShowCoverModal({status: true, table});
    }
  };

  return (
    <>
      {profile.managerMode ? (
        <Button
          mode="contained"
          icon={'plus'}
          style={{margin: 10}}
          onPress={() => setShowAddModal(true)}>
          Add Table
        </Button>
      ) : null}
      <View style={[tableStyles.tableContainer, {...styles.container}]}>
        <AddTableModal
          visible={showAddModal}
          setVisible={setShowAddModal}
          onAdd={addTable}
        />

        <UpdateTableModal
          table={updateModal.table}
          visible={updateModal.status}
          setVisible={() => setUpdateModal({status: false, table: null})}
          onUpdate={updateTable}
        />

        <TableCoverModal
          visible={showCoverModal.status}
          onDismiss={() => setShowCoverModal({status: false, table: null})}
          table={showCoverModal?.table}
        />

        <TableOptionsModal
          table={showOptionsModal.table}
          visible={showOptionsModal.status}
          setVisible={() => setShowOptionsModal({status: false, table: null})}
          onDelete={deleteTable}
          onUpdate={() => {
            setShowOptionsModal(prev => ({...prev, status: false}));
            setUpdateModal({status: true, table: showOptionsModal.table});
          }}
        />
        {tables.map((table, index) => {
          let openOrders = table.orders.filtered('isConfirmed == $0', true)[0];
          return (
            <TableComponent
              order={openOrders}
              key={table?._id}
              title={table?.title}
              onLongPress={() => {
                if (profile.managerMode)
                  setShowOptionsModal({status: true, table});
              }}
              onPress={() => onCardPress(table, openOrders)}
            />
          );
        })}
      </View>
    </>
  );
};

const tableStyles = StyleSheet.create({
  tableContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: globalColors.secondary,
  },
});

export default Tables;
