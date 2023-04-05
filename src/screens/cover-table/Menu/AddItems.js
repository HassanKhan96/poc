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
import {FlatList, Pressable, View, TouchableOpacity} from 'react-native';
import menuStyles from '../../menu/styles';
import globalColors from '../../../styles/colors';
import {useState, memo, useEffect, useCallback} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import ItemModal from '../../../components/ItemModal';
import {realmContext} from '../../../context/RealmContext';
import {CategoryModal} from '../../../schema/categorySchema';
import {useUser} from '@realm/react';
import {Item} from '../../../schema/Item';
import SnackMessage from '../../../components/SnackMessage';

const AddItems = () => {
  const {useRealm, useQuery} = realmContext;
  const realm = useRealm();
  const user = useUser();
  let itemQuery = `userId == "${user.id}"`;
  const [showMenu, setShowMenu] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [filterQuery, setFilterQuery] = useState(itemQuery);
  const [updates, setUpdates] = useState(null);
  const [alert, setAlert] = useState({message: '', status: false});

  const categories = realm
    .objects(CategoryModal)
    .filtered('userId == $0', user.id);

  const menuItems = useQuery(Item)
    .filtered(filterQuery + ` AND name LIKE[c] '*${search}*'`)
    .sorted('_id');

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(Item), {name: 'items'});
    });
  }, []);

  useEffect(() => {
    if (filterCategory !== 'All') {
      setFilterQuery(
        itemQuery.concat(` AND category.name == "${filterCategory}"`),
      );
    } else {
      setFilterQuery(itemQuery);
    }
  }, [filterCategory]);

  const onSelectCategory = category => {
    setFilterCategory(category);
    setShowMenu(false);
  };

  const onSubmit = (values, id = null) => {};

  return (
    <View style={menuStyles.container}>
      <ItemModal
        visible={showItemModal}
        setVisible={value => {
          if (!value) setUpdates(false);
          setShowItemModal(value);
        }}
        categories={categories}
        onSubmit={(values, id = null) => onSubmit(values, id)}
        updates={updates}
      />
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
      <Card.Content style={{flex: 1, paddingLeft: 0, paddingRight: 0}}>
        <FlatList
          data={menuItems}
          style={{
            flex: 1,
          }}
          showsVerticalScrollIndicator={true}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            flex: 1,
          }}
          numColumns={2}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity>
                <Card
                  style={[menuStyles.itemCard, {width: 150}]}
                  mode="contained">
                  <View style={menuStyles.itemContainer}>
                    <View style={menuStyles.itemInfoContainer}>
                      <Text variant="titleSmall">{item?.name}</Text>

                      <Text style={{marginBottom: 10}} variant="labelMedium">
                        Price: £{item?.price}
                      </Text>

                      <Text
                        variant="bodySmall"
                        style={{color: globalColors.darkGray}}>
                        {item?.category?.name}
                      </Text>
                    </View>
                    {/* <View style={menuStyles.itemActionContainer}>
                    <Text
                      variant="labelMedium"
                      style={{marginBottom: 7, color: globalColors.darkGray}}>
                      {item?.category?.name}
                    </Text>
                  </View> */}
                  </View>
                </Card>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item._id}
        />
      </Card.Content>
    </View>
  );
};

export default memo(AddItems);
