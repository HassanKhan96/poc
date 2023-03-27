import React, {useCallback, useState} from 'react';
import {Button, Snackbar, Text, TextInput} from 'react-native-paper';
import styles from './styles';
import defaultStyles from '../../../styles/defualt.styles';
import {TouchableOpacity, View} from 'react-native';
import globalColors from '../../../styles/colors';
import {AuthContainer} from '../AuthContainer';
import Realm from 'realm';
import {useApp} from '@realm/react';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({status: false, message: ''});
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const app = useApp();

  const register = useCallback(async () => {
    //register logic here
    try {
      setLoading(true);
      await app.emailPasswordAuth.registerUser({email, password});
      const creds = Realm.Credentials.emailPassword(email, password);
      await app.logIn(creds);
    } catch (error) {
      setAlert({message: error?.message, status: true});
      setLoading(false);
    }
  }, [email, password, app]);
  return (
    <AuthContainer>
      <Snackbar
        style={{width: '100%'}}
        visible={alert.status}
        onDismiss={() => setAlert({message: '', status: false})}
        action={{
          label: 'Close',
          onPress: () => setAlert({message: '', status: false}),
        }}>
        {alert.message}
      </Snackbar>
      <Text variant="headlineLarge">Register</Text>
      <View>
        <TextInput
          style={defaultStyles.inputText}
          label="Full Name"
          mode="outlined"
          value={name}
          onChangeText={text => setName(text)}
          outlineColor={globalColors.secondary}
          left={<TextInput.Icon icon={'account'} />}
          disabled={loading}
        />
        <TextInput
          style={defaultStyles.inputText}
          label="Email"
          mode="outlined"
          autoCapitalize="none"
          autoComplete="off"
          value={email}
          onChangeText={text => setEmail(text)}
          outlineColor={globalColors.secondary}
          left={<TextInput.Icon icon={'email'} />}
          disabled={loading}
        />
        <TextInput
          style={defaultStyles.inputText}
          label="Password"
          mode="outlined"
          value={password}
          onChangeText={text => setPassword(text)}
          outlineColor={globalColors.secondary}
          secureTextEntry={hidePassword}
          left={<TextInput.Icon icon={'account-lock'} />}
          right={
            hidePassword ? (
              <TextInput.Icon
                icon={'eye'}
                onPress={() => setHidePassword(false)}
              />
            ) : (
              <TextInput.Icon
                icon={'eye-off'}
                onPress={() => setHidePassword(true)}
              />
            )
          }
          disabled={loading}
        />
      </View>

      <View style={styles.buttonSection}>
        <Button
          mode="contained"
          onPress={register}
          disabled={loading}
          loading={loading}>
          Register
        </Button>

        <View style={styles.suggestionSection}>
          <Text>Already have an account?</Text>
          <TouchableOpacity
            style={{marginLeft: 5}}
            onPress={() => navigation.navigate('Login')}>
            <Text variant="bodyLarge" style={defaultStyles.linkColor}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthContainer>
  );
};

export default Register;
