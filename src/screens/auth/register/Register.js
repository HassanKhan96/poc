import React from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import styles from './styles';
import defaultStyles from '../../../styles/defualt.styles';
import {TouchableOpacity, View} from 'react-native';
import globalColors from '../../../styles/colors';
import {AuthContainer} from '../AuthContainer';

const Register = () => {
  return (
    <AuthContainer>
      <Text style={styles.sectionHeader}>Register</Text>
      <View>
        <TextInput
          style={defaultStyles.inputText}
          label="Full Name"
          mode="outlined"
          outlineColor={globalColors.secondary}
          left={<TextInput.Icon icon={'account'} />}
        />
        <TextInput
          style={defaultStyles.inputText}
          label="Email"
          mode="outlined"
          outlineColor={globalColors.secondary}
          left={<TextInput.Icon icon={'email'} />}
        />
        <TextInput
          style={defaultStyles.inputText}
          label="Password"
          mode="outlined"
          outlineColor={globalColors.secondary}
          secureTextEntry
          left={<TextInput.Icon icon={'account-lock'} />}
          right={<TextInput.Icon icon={'eye'} />}
        />
      </View>
      <View style={styles.buttonSection}>
        <Button mode="contained">Login</Button>
        <View style={styles.suggestionSection}>
          <Text>Already have an account?</Text>
          <TouchableOpacity style={{marginLeft: 5}}>
            <Text style={defaultStyles.linkColor}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthContainer>
  );
};

export default Register;
