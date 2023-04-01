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
import CustomModal from '../../components/Modal';

const Category = () => {
  const {useRealm, useQuery} = realmContext;
  const user = useUser();
  const realm = useRealm();
  const categories = useQuery(CategoryModal)
    .filtered('userId == $0', user.id)
    .sorted('createdAt');
  const [newCategory, setNewCategory] = useState('');
  const [updateValue, setUpdateValue] = useState('');
  const [update, setUpdate] = useState({status: false, data: null});

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
      if (existingCategory.length) return;

      realm.write(() => {
        return new CategoryModal(realm, {
          userId: user?.id,
          name,
          items: [],
        });
      });
      setNewCategory('');
    },
    [user, realm],
  );

  const deleteCategory = useCallback(
    id => {
      const category = realm.objectForPrimaryKey(CategoryModal, id);
      if (category) {
        realm.write(() => {
          realm.delete(category);
        });
      }
    },
    [user, realm],
  );

  const updateCategory = useCallback(
    (id, name) => {
      const category = realm.objectForPrimaryKey(CategoryModal, id);
      if (category && name) {
        realm.write(() => {
          category.name = name;
        });
        setUpdate({status: false, data: null});
        setUpdateValue('');
      }
    },
    [user, realm],
  );

  return (
    <View style={menuStyles.container}>
      <CustomModal
        visible={update.status}
        setVisible={status => setUpdate({status, data: null})}
        title="Edit Category">
        <TextInput
          mode="outlined"
          style={{
            backgroundColor: globalColors.white,
            fontSize: 13,
            marginBottom: 20,
          }}
          outlineColor={globalColors.gray}
          onChangeText={text => setUpdateValue(text)}
          defaultValue={update.data?.name}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Button
            mode="contained"
            onPress={() => {
              updateCategory(update.data?._id, updateValue);
            }}>
            Update
          </Button>
          <Button
            buttonColor={globalColors.danger}
            mode="contained"
            onPress={() => {
              setUpdate({status: false, data: null});
              setUpdateValue('');
            }}>
            Cancel
          </Button>
        </View>
      </CustomModal>

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
                        onPress={() => setUpdate({status: true, data: item})}
                      />
                      <IconButton
                        size={20}
                        icon={'trash-can'}
                        style={menuStyles.itemActionBtn}
                        iconColor={globalColors.danger}
                        onPress={() => deleteCategory(item?._id)}
                      />
                    </View>
                  </View>
                </View>
              </Card>
            );
          }}
          keyExtractor={item => item?._id}
        />
      </Card.Content>
      {/* </Card> */}
    </View>
  );
};

export default memo(Category);
