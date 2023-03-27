import {useUser} from '@realm/react';
import React, {useCallback, useEffect, useState} from 'react';
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
const Tables = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState({
    status: false,
    table: null,
  });
  const [updateModal, setUpdateModal] = useState({status: false, table: null});
  const {useRealm, useQuery} = realmContext;
  const user = useUser();
  const realm = useRealm();

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
        return new Table(realm, {
          userId: user?.id,
          title,
        });
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

  return (
    <>
      <Button
        mode="contained"
        icon={'plus'}
        style={{margin: 10}}
        onPress={() => setShowAddModal(true)}>
        Add Table
      </Button>
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
          return (
            <TableComponent
              key={table?._id}
              title={table?.title}
              onLongPress={() => setShowOptionsModal({status: true, table})}
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
