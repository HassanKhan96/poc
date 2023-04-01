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
import {useState, memo, useEffect, useCallback} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomModal from '../../components/Modal';
import ItemModal from '../../components/ItemModal';
import {realmContext} from '../../context/RealmContext';
import {CategoryModal} from '../../schema/categorySchema';
import {useUser} from '@realm/react';
import {Item} from '../../schema/Item';

const MenuItems = () => {
  const {useRealm, useQuery} = realmContext;
  const realm = useRealm();
  const user = useUser();
  let itemQuery = `userId == "${user.id}"`
  const [showMenu, setShowMenu] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');
  const [search, setSearch] = useState('')
  const [filterQuery, setFilterQuery] = useState(itemQuery)
  

  const categories = realm
    .objects(CategoryModal)
    .filtered('userId == $0', user.id);

  const menuItems = useQuery(Item)
    .filtered(filterQuery+` AND name LIKE[c] '*${search}*'`)
    .sorted('_id');

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(Item), {name: 'items'});
    });
  }, []);

  useEffect(() => {
    if(filterCategory !== 'All') {
      setFilterQuery(itemQuery.concat(` AND category.name == "${filterCategory}"`))
    }
    else {
      setFilterQuery(itemQuery)
    }
  },[filterCategory])


  const onSelectCategory = category => {
    setFilterCategory(category);
    setShowMenu(false);
  };

  const addItem = useCallback(
    item => {
      const itemExists = realm.objects(Item).filtered('name == $0', item?.name);
      if (itemExists.length) return;

      const categoryExists = realm.objectForPrimaryKey(
        CategoryModal,
        item?.category,
      );
      if (!categoryExists) return;

      realm.write(() => {
        let newItem = new Item(realm, {
          _id: Realm.BSON.ObjectId(),
          name: item?.name,
          price: Number(item.price),
          takeAwayPrice: Number(item?.takeAwayPrice),
          userId: user?.id,
        });
        categoryExists.items.push(newItem);
      });
    },
    [user, realm],
  );

  const deleteItem = useCallback(
    id => {
      try {
        const item = realm.objectForPrimaryKey(Item, id);
        realm.write(() => {
          realm.delete(item);
        });
      } catch (error) {
        console.log(error);
      }
    },
    [user, realm],
  );

  return (
    <View style={menuStyles.container}>
      <ItemModal
        title={'Add New Item'}
        visible={showItemModal}
        setVisible={setShowItemModal}
        categories={categories}
        onSubmit={values => addItem(values)}
      />
      <Button
        mode="contained"
        icon="plus"
        style={{marginVertical: 10}}
        onPress={() => setShowItemModal(true)}>
        Add New Item
      </Button>
      <View style={menuStyles.categoryField}>
        <TextInput
          mode="outlined"
          style={{backgroundColor: globalColors.white, fontSize: 13}}
          label="Search"
          value={search}
          onChangeText={text => setSearch(text)}
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
                    key={category?._id}
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
                      {item?.category[0]?.name}
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
                        onPress={() => deleteItem(item._id)}
                      />
                    </View>
                  </View>
                </View>
              </Card>
            );
          }}
          keyExtractor={item => item._id}
        />
      </Card.Content>
    </View>
  );
};

export default memo(MenuItems);
