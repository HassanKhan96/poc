import {
  Button,
  Card,
  List,
  Modal,
  Portal,
  Switch,
  Text,
  TextInput,
} from 'react-native-paper';
import {View} from 'react-native';
import profileStyles from './styles';
import globalColors from '../../styles/colors';
import {useContext, useEffect, useState} from 'react';
import ProfileContext from '../../context/profileContext';
import {realmContext} from '../../context/RealmContext';
import {useUser} from '@realm/react';
import {User} from '../../schema/userSchema';

const Profile = () => {
  const {profile, setProfile} = useContext(ProfileContext);
  const [showManagerModal, setShowManagerModal] = useState(false);
  const {useRealm} = realmContext;
  const user = useUser();
  const realm = useRealm();
  const [pin, setPin] = useState('');

  let userProfile = realm.objectForPrimaryKey(
    User,
    Realm.BSON.ObjectId(user.id),
  );
  console.log(user.id);

  const onSwitchChange = () => {
    if (!profile.managerMode) setShowManagerModal(true);
    else setProfile(prev => ({...prev, managerMode: false}));
  };

  const onPinSubmit = () => {
    if (userProfile.managerPin == pin)
      setProfile(prev => ({...prev, managerMode: true}));
    else console.log('wrong pin');

    setShowManagerModal(false);
    setPin('');
  };
  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(User), {name: 'Users'});
    });
  }, [realm, user]);

  // useEffect(() => {
  //   realm.write(() => {
  //     new User(realm, {
  //       _id: new Realm.BSON.ObjectId(user.id),
  //       managerPin: '13232',
  //     });
  //   });
  // }, []);
  return (
    <View>
      <Portal>
        <Modal
          visible={showManagerModal}
          onDismiss={() => null}
          style={{paddingHorizontal: 15}}>
          <Card>
            <Card.Content>
              <Text>Manage Mode</Text>
              <TextInput
                value={pin}
                onChangeText={text => setPin(text)}
                mode="outlined"
                label="Enter Pin"
                outlineColor={globalColors.primary}
                keyboardType="number-pad"
              />
              <View style={{marginTop: 15}}>
                {pin ? (
                  <Button mode="contained" onPress={onPinSubmit}>
                    Submit
                  </Button>
                ) : (
                  <Button mode="contained" buttonColor={globalColors.danger}>
                    Close
                  </Button>
                )}
              </View>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
      <List.Section style={{marginTop: 0}}>
        <List.Item
          style={profileStyles.itemContainer}
          title="Toggle Manager Mode"
          left={() => <List.Icon color={globalColors.gray800} icon="lock" />}
          right={() => (
            <Switch
              value={profile.managerMode}
              onValueChange={onSwitchChange}
            />
          )}
        />
        {/* <List.Item
          style={profileStyles.itemContainer}
          title="Second Item"
          left={() => <List.Icon color={globalColors.gray800} icon="folder" />}
        /> */}
      </List.Section>
    </View>
  );
};

export default Profile;
