import {
  Button,
  Card,
  IconButton,
  List,
  Menu,
  Searchbar,
  Text,
  TextInput,
} from 'react-native-paper';
import {FlatList, Pressable, View} from 'react-native';
import menuStyles from './styles';
import globalColors from '../../styles/colors';
import {useState, memo} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomModal from '../../components/Modal';
import ItemModal from '../../components/ItemModal';

const MenuItems = ({menuItems, categories}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false)
  const [filterCategory, setFilterCategory] = useState('All');


  const onSelectCategory = category => {
    setFilterCategory(category);
    setShowMenu(false);
  };

  return (
    <View style={menuStyles.container}>
      <ItemModal title={"Add New Item"} visible={showItemModal} setVisible={setShowItemModal}/>
      <Button mode='contained' icon="plus" style={{ marginVertical: 10}} onPress={() => setShowItemModal(true)}>Add New Item</Button>
      <View style={menuStyles.categoryField}>
        <TextInput
          mode="outlined"
          style={{backgroundColor: globalColors.white, fontSize: 13}}
          label="Search"
          outlineColor={globalColors.gray}
          left={<TextInput.Icon icon="magnify" iconColor={globalColors.gray} />}
        />
      </View>
      <View style={menuStyles.itemFilterContainer}>
        <Text variant="labelLarge">Category</Text>
        <Pressable onPress={() => setShowMenu(true)}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              height: 30,
              minWidth: 100,
            }}>
            <Text variant="labelMedium" style={{marginRight: 5}}>
              {filterCategory}
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
              <Menu.Item title="All" onPress={() => onSelectCategory('All')} />
              {categories.map(category => {
                return (
                  <Menu.Item
                    key={category.key}
                    title={category?.name}
                    onPress={() => onSelectCategory(category?.name)}
                  />
                );
              })}
            </Menu>
          </View>
        </Pressable>
      </View>
      <Card.Content style={menuStyles.listContainer}>
        <FlatList
          data={menuItems}
          style={{flex: 1, marginBottom: 10}}
          showsVerticalScrollIndicator={true}
          renderItem={({item, index}) => {
            return (
              <Card style={menuStyles.itemCard} mode="contained">
                <View style={menuStyles.itemContainer}>
                  <View style={menuStyles.itemInfoContainer}>
                    <Text variant="titleSmall">{item?.name}</Text>

                    <Text style={{marginBottom: 10}} variant="labelMedium">
                      Price: £{item?.price}
                    </Text>

                    <Text
                      variant="bodySmall"
                      style={{color: globalColors.darkGray}}>
                      Take away: £{item?.takeAwayPrice}
                    </Text>
                  </View>
                  <View style={menuStyles.itemActionContainer}>
                    <Text
                      variant="labelMedium"
                      style={{marginBottom: 7, color: globalColors.darkGray}}>
                      {item?.category}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <IconButton
                        icon={'pencil'}
                        style={menuStyles.itemActionBtn}
                        size={20}
                        iconColor={globalColors.primary}
                      />
                      <IconButton
                        size={20}
                        icon={'trash-can'}
                        style={menuStyles.itemActionBtn}
                        iconColor={globalColors.danger}
                      />
                    </View>
                  </View>
                </View>
              </Card>
            );
          }}
          keyExtractor={item => item.key}
        />
      </Card.Content>
    </View>
  );
};

export default memo(MenuItems);
