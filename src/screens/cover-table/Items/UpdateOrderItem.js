import {Appbar, Button, Modal, Portal, Text} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import globalColors from '../../../styles/colors';
import CounterField from '../../../components/CounterField';

const UpdateOrderItem = ({
  showModal,
  setShowModal = () => null,
  itemData,
  setItemData = () => null,
  saveItem = () => null,
}) => {
  return (
    <Portal>
      <Modal
        visible={showModal}
        style={styles.editItemModal}
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
        <View style={styles.editItemModalBody}>
          <View style={styles.editItemContainer}>
            <View style={styles.editItemCounter}>
              <Text variant="titleMedium">Quantity</Text>
              <CounterField
                count={itemData?.quantity}
                onChange={v => setItemData(prev => ({...prev, quantity: v}))}
              />
            </View>
          </View>
          <View>
            <Button mode="contained" onPress={() => saveItem(itemData)}>
              Save
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  editItemModal: {
    borderColor: 'yellow',
    justifyContent: 'flex-start',
    backgroundColor: globalColors.white,
  },

  editItemModalBody: {
    paddingTop: 20,
    height: '90%',
    paddingHorizontal: 15,
  },

  editItemCounter: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  editItemContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

export default UpdateOrderItem;
