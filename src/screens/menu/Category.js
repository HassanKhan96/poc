import {
  Button,
  Card,
  IconButton,
  List,
  Text,
  TextInput,
} from 'react-native-paper';
import {FlatList, View} from 'react-native';
import menuStyles from './styles';
import globalColors from '../../styles/colors';
import {memo, useCallback, useEffect, useState} from 'react';
import {useUser} from '@realm/react';
import {realmContext} from '../../context/RealmContext';
import {CategoryModal} from '../../schema/categorySchema';

const Category = ({categories}) => {
  console.log(categories);
  const {useRealm} = realmContext;
  const user = useUser();
  const realm = useRealm();
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(CategoryModal), {name: 'categories'});
    });
  }, []);

  const addCategory = useCallback(
    name => {
      const existingCategory = realm
        .objects(CategoryModal)
        .filtered('name == $0', name);
      console.log(existingCategory);
      if (existingCategory.length) return;

      realm.write(() => {
        return new CategoryModal(realm, {
          userId: user?.id,
          name,
        });
      });
    },
    [user, realm],
  );

  const deleteCategory = useCallback(
    name => {
      const category = realm.objectForPrimaryKey(CategoryModal, name);
      if (category) {
        realm.write(() => {
          realm.delete(categories);
        });
      }
    },
    [user, realm],
  );

  const updateCategory = useCallback(
    name => {
      const category = realm.objectForPrimaryKey(CategoryModal, name);
      if (category) {
        realm.write(() => {
          category.name = name;
        });
      }
    },
    [user, realm],
  );
  return (
    <View style={menuStyles.container}>
      {/* <Card style={menuStyles.categoryCard}> */}
      <View style={menuStyles.categoryField}>
        <TextInput
          mode="outlined"
          style={{backgroundColor: globalColors.white, fontSize: 13}}
          label="Add Category"
          outlineColor={globalColors.gray}
          value={newCategory}
          onChangeText={text => setNewCategory(text)}
          right={
            <TextInput.Icon
              icon="plus-box"
              iconColor={globalColors.green}
              onPress={() => addCategory(newCategory)}
            />
          }
        />
      </View>
      <Card.Content
        style={{
          paddingLeft: 0,
          paddingRight: 0,
          marginTop: 10,
          height: '100%',
          flexGrow: 1,
          flexShrink: 1,
        }}>
        <FlatList
          data={categories}
          style={{width: '100%'}}
          showsVerticalScrollIndicator={true}
          renderItem={({item, index}) => {
            return (
              <Card style={menuStyles.itemCard} mode="contained">
                <View style={menuStyles.itemContainer}>
                  <Text variant="titleSmall">{item?.name}</Text>
                  <View style={menuStyles.itemActionContainer}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
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
          keyExtractor={item => item._id}
        />
      </Card.Content>
      {/* </Card> */}
    </View>
  );
};

export default memo(Category);
