import React, {useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import {Button, Menu, Modal, Portal, Text, TextInput} from 'react-native-paper';
import globalColors from '../styles/colors';
import Icon from 'react-native-vector-icons/AntDesign';

const ItemModal = ({
  visible,
  setVisible,
  title,
  categories,
  onSubmit = () => null,
  updates = null,
}) => {
  const init = {
    name: '',
    price: '',
    takeAwayPrice: '',
    category: '',
  };
  const [showMenu, setShowMenu] = useState(false);
  const [selectCategory, setSelectCategory] = useState('');
  const [itemValues, setItemValues] = useState(init);

  useEffect(() => {
    if (updates) {
      setItemValues({
        name: updates?.name,
        price: updates.price?.toString(),
        takeAwayPrice: updates?.takeAwayPrice?.toString(),
        category: updates?.category[0]?._id,
      });
      setSelectCategory(updates?.category[0]?.name);
    }
  }, [updates]);

  const onAdd = () => {
    if (
      !itemValues.name ||
      !itemValues.category ||
      !itemValues.price ||
      !itemValues.takeAwayPrice
    )
      return;
    onSubmit(itemValues, updates?._id);
    setVisible(false);
    setItemValues(init);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={{padding: 20, backgroundColor: '#fff'}}>
        <Text variant="headlineLarge" style={{marginBottom: 20}}>
          {!updates ? 'Add New Item' : 'Update Item'}
        </Text>
        <TextInput
          mode="outlined"
          style={{
            backgroundColor: globalColors.white,
            marginBottom: 10,
          }}
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
          keyboardType="default"
          label="Name"
          outlineColor={globalColors.gray}
          value={itemValues.name}
          onChangeText={text => setItemValues(prev => ({...prev, name: text}))}
        />
        <TextInput
          mode="outlined"
          style={{
            backgroundColor: globalColors.white,
            marginBottom: 10,
          }}
          label="Price"
          outlineColor={globalColors.gray}
          keyboardType="numeric"
          value={itemValues.price}
          onChangeText={text => setItemValues(prev => ({...prev, price: text}))}
        />
        <TextInput
          mode="outlined"
          style={{
            backgroundColor: globalColors.white,
            marginBottom: 10,
          }}
          label="Takeaway Price"
          outlineColor={globalColors.gray}
          keyboardType="numeric"
          value={itemValues.takeAwayPrice}
          onChangeText={text =>
            setItemValues(prev => ({...prev, takeAwayPrice: text}))
          }
        />

        <View style={{marginTop: 10}}>
          <Text variant="titleMedium">Category</Text>
          {/* <Picker
            mode="dropdown"
            dropdownIconColor={globalColors.black}
            selectionColor="#000"
            dropdownIconRippleColor={globalColors.gray}
            style={{
              color: globalColors.darkGray,
              fontFamily: 'PlusJakartaSans-Regular',
            }}
            itemStyle={{fontFamily: 'PlusJakartaSans-Regular', color: '#ccc'}}
            // selectedValue={itemValues.category}
            onValueChange={(itemValue, index) => {
              setItemValues(prev => ({...prev, category: itemValue}));
            }}>
            <Picker.Item label="Select a value" value="" />
            {categories.map((item, index) => {
              return (
                <Picker.Item
                  key={item?._id}
                  value={item?._id}
                  label={item?.name}
                />
              );
            })}
          </Picker> */}

          <Pressable onPress={() => setShowMenu(true)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                marginTop: 5,
                marginBottom: 10,
                justifyContent: 'space-between',
                height: 30,
                minWidth: 100,
              }}>
              <Text
                variant="titleMedium"
                style={{marginRight: 5, color: '#999'}}>
                {selectCategory}
              </Text>
              <Menu
                visible={showMenu}
                anchor={
                  <Pressable onPress={() => setShowMenu(true)}>
                    <Icon
                      name="caretdown"
                      size={14}
                      color={globalColors.gray800}
                    />
                  </Pressable>
                }
                onDismiss={() => setShowMenu(false)}>
                {categories.map(category => {
                  return (
                    <Menu.Item
                      key={category._id}
                      title={category?.name}
                      onPress={() => {
                        setSelectCategory(category?.name);
                        setItemValues(prev => ({
                          ...prev,
                          category: category?._id,
                        }));
                        setShowMenu(false);
                      }}
                    />
                  );
                })}
              </Menu>
            </View>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            marginTop: 10,
          }}>
          <Button
            mode="contained"
            buttonColor={globalColors.primary}
            onPress={() => onAdd()}
            style={{marginBottom: 10}}>
            Add
          </Button>
          <Button
            mode="contained"
            buttonColor={globalColors.danger}
            style={{marginBottom: 10}}
            onPress={() => {
              setItemValues(init);
              setVisible(false);
            }}>
            Cancel
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default React.memo(ItemModal);
