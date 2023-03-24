import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import {Text} from 'react-native-paper';

export const AuthContainer = ({children}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Icons name="dinner-dining" size={75} color={'#fff'} />
        <Text variant="titleLarge" style={styles.topSectionText}>
          POC App
        </Text>
      </View>
      <View style={styles.inputSection}>{children}</View>
    </View>
  );
};

export default AuthContainer;
