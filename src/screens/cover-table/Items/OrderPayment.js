import {
  Appbar,
  Button,
  Modal,
  Portal,
  Text,
  TextInput,
} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import globalColors from '../../../styles/colors';
import CounterField from '../../../components/CounterField';
import {useState} from 'react';

const OrderPayment = ({
  showModal,
  setShowModal = () => null,
  itemData,
  setItemData = () => null,
  saveItem = () => null,
}) => {
  const [amount, setAmount] = useState('');
  let bill = itemData?.amountPayable;
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
              <Text variant="titleMedium">Payable</Text>
              <Text variant="labelLarge">£ {bill}</Text>
            </View>
            <View style={styles.editItemInputContainer}>
              <TextInput
                label={'Amount'}
                mode="outlined"
                outlineColor={globalColors.primary}
                style={styles.editItemInput}
                keyboardType="numeric"
                value={amount}
                onChangeText={text => setAmount(text)}
                disabled={bill == 0}
              />
            </View>
          </View>
          <View>
            <Button
              mode="contained"
              disabled={bill == 0}
              onPress={() => {
                if (amount) saveItem(amount);
              }}>
              Pay
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

  editItemInputContainer: {
    marginTop: 20,
  },

  editItemInput: {
    backgroundColor: globalColors.white,
  },
});

export default OrderPayment;
