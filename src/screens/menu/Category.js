import {
  Button,
  Card,
  IconButton,
  List,
  Modal,
  Portal,
  Text,
  TextInput,
} from 'react-native-paper';
import {FlatList, View} from 'react-native';
import menuStyles from './styles';
import globalColors from '../../styles/colors';
import {memo, useCallback, useContext, useEffect, useState} from 'react';
import {useUser} from '@realm/react';
import {realmContext} from '../../context/RealmContext';
import {CategoryModal} from '../../schema/categorySchema';
import CustomModal from '../../components/Modal';
import SnackMessage from '../../components/SnackMessage';
import ProfileContext from '../../context/profileContext';

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
  const [alert, setAlert] = useState({message: '', status: false});
  const {profile} = useContext(ProfileContext);

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(CategoryModal), {name: 'categories'});
    });
  }, []);

  const addCategory = useCallback(
    name => {
      try {
        const existingCategory = realm
          .objects(CategoryModal)
          .filtered('name == $0', name);
        if (existingCategory.length)
          return setAlert({message: 'Category exists', status: true});

        realm.write(() => {
          return new CategoryModal(realm, {
            userId: user?.id,
            name,
            items: [],
          });
        });
        setNewCategory('');
        setAlert({message: 'Category added', status: true});
      } catch (error) {
        setAlert({message: error.message, status: true});
      }
    },
    [user, realm],
  );

  const deleteCategory = useCallback(
    id => {
      try {
        const category = realm.objectForPrimaryKey(CategoryModal, id);
        if (!category)
          return setAlert({message: 'Category does not exist', status: true});
        realm.write(() => {
          realm.delete(category);
        });
        setAlert({message: 'Category deleted', status: true});
      } catch (error) {
        setAlert({message: error.message, status: true});
      }
    },
    [user, realm],
  );

  const updateCategory = useCallback(
    (id, name) => {
      try {
        const category = realm.objectForPrimaryKey(CategoryModal, id);
        if (category && name) {
          realm.write(() => {
            category.name = name;
          });
          setUpdate({status: false, data: null});
          setUpdateValue('');
          setAlert({message: 'Category updated', status: true});
        }
      } catch (error) {
        setAlert({message: error.message, status: true});
      }
    },
    [user, realm],
  );

  return (
    <View style={menuStyles.container}>
      <SnackMessage
        visible={alert.status}
        message={alert.message}
        onClose={() => setAlert({message: '', status: false})}
      />
      <Portal>
        <Modal
          visible={update.status}
          onDismiss={status => setUpdate({status, data: null})}
          style={{padding: 20, backgroundColor: '#fff'}}>
          <Text variant="headlineLarge" style={{marginBottom: 20}}>
            Edit Category
          </Text>
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
        </Modal>
      </Portal>

      {profile.managerMode ? (
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
      ) : null}
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
                      {profile.managerMode ? (
                        <>
                          <IconButton
                            icon={'pencil'}
                            style={menuStyles.itemActionBtn}
                            size={20}
                            iconColor={globalColors.primary}
                            onPress={() =>
                              setUpdate({status: true, data: item})
                            }
                          />
                          <IconButton
                            size={20}
                            icon={'trash-can'}
                            style={menuStyles.itemActionBtn}
                            iconColor={globalColors.danger}
                            onPress={() => deleteCategory(item?._id)}
                          />
                        </>
                      ) : null}
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
