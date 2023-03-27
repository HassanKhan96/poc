import React, {useCallback, useState} from 'react';
import {Button, Snackbar, Text, TextInput} from 'react-native-paper';
import styles from './styles';
import defaultStyles from '../../../styles/defualt.styles';
import {Alert, Pressable, TouchableOpacity, View} from 'react-native';
import globalColors from '../../../styles/colors';
import {AuthContainer} from '../AuthContainer';
import Realm from 'realm';
import {useApp} from '@realm/react';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [alert, setAlert] = useState({status: false, message: ''});
  const [loading, setLoading] = useState(false);
  const app = useApp();

  const login = useCallback(async () => {
    //login logic here
    try {
      setLoading(true);
      const cred = Realm.Credentials.emailPassword(email, password);
      await app.logIn(cred);
      setLoading(false);
    } catch (error) {
      setAlert({message: error.message, status: true});
      setLoading(false);
    }
  }, [app, email, password]);

  return (
    <AuthContainer>
      <Text variant="headlineLarge">Login</Text>
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
      <View>
        <TextInput
          style={defaultStyles.inputText}
          label="Email"
          mode="outlined"
          value={email}
          autoCapitalize={'none'}
          autoComplete="off"
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
          disabled={loading}
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
        />
      </View>
      <View style={styles.buttonSection}>
        <Button
          disabled={loading}
          loading={loading}
          mode="contained"
          onPress={login}>
          Login
        </Button>
        <View style={styles.suggestionSection}>
          <Text> Don't have an account?</Text>
          <TouchableOpacity
            style={{marginLeft: 5}}
            onPress={() => navigation.navigate('Register')}>
            <Text variant="bodyLarge" style={defaultStyles.linkColor}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthContainer>
  );
};

export default Login;
