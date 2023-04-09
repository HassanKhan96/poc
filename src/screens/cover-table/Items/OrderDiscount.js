import {
  Appbar,
  Button,
  Menu,
  Modal,
  Portal,
  Text,
  TextInput,
} from 'react-native-paper';
import {View, StyleSheet, Pressable} from 'react-native';
import globalColors from '../../../styles/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {useEffect, useState} from 'react';

const OrderDiscount = ({
  showModal,
  setShowModal = () => null,
  itemData,
  setItemData = () => null,
  saveItem = () => null,
}) => {
  const [discount, setDiscount] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountType, setDiscountType] = useState('Amount');
  let bill = itemData?.amountPayable;
  const onSelectDiscount = type => {
    setDiscountType(type);
    setShowMenu(false);
  };

  useEffect(() => {
    calculateDiscount();
  }, [discountType, discount]);

  const calculateDiscount = () => {
    if (discount === '') return setDiscountAmount(0);
    let disc = 0;
    if (discountType === 'Percentage') {
      if (Number(discount) <= 100) disc = (Number(discount) / 100) * bill;
    } else if (Number(discount) <= bill) disc = Number(discount);
    setDiscountAmount(disc);
  };
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
              setDiscount('');
              setDiscountType('Amount');
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
                label={'Discount'}
                mode="outlined"
                outlineColor={globalColors.primary}
                style={styles.editItemInput}
                keyboardType="numeric"
                value={discount}
                onChangeText={text => setDiscount(text)}
                disabled={bill == 0}
              />
            </View>
            <View style={styles.discountSection}>
              <Text variant="titleMedium">Discount Type</Text>
              <Pressable onPress={() => setShowMenu(true)}>
                <View style={styles.discountType}>
                  <Text variant="labelLarge" style={{marginRight: 5}}>
                    {discountType}
                  </Text>
                  <Menu
                    visible={showMenu}
                    anchor={
                      <Pressable onPress={() => setShowMenu(true)}>
                        <Icon
                          name="caretdown"
                          size={18}
                          color={globalColors.gray800}
                        />
                      </Pressable>
                    }
                    onDismiss={() => setShowMenu(false)}>
                    <Menu.Item
                      title={'Amount '}
                      onPress={() => onSelectDiscount('Amount')}
                    />
                    <Menu.Item
                      title={'Percentage '}
                      onPress={() => onSelectDiscount('Percentage')}
                    />
                  </Menu>
                </View>
              </Pressable>
            </View>
            <View style={styles.afterSection}>
              <Text variant="titleMedium">Total Discount</Text>
              <Text variant="titleSmall" style={{marginTop: 10}}>
                £ {discountAmount}
              </Text>
            </View>
          </View>
          <View>
            <Button
              mode="contained"
              disabled={discount === ''}
              onPress={() => {
                if (discountAmount) saveItem(discountAmount);
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

  discountSection: {
    marginTop: 30,
    justifyContent: 'flex-start',
  },

  discountType: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
    height: 30,
    width: 100,
  },

  afterSection: {
    marginTop: 30,
  },
});

export default OrderDiscount;
