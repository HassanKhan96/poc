import {Pressable, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import globalColors from '../styles/colors';
const TabButton = ({name, title, disabled = false, onPress = () => null}) => {
  return (
    <Pressable
      onPress={() => {
        if (!disabled) {
          onPress();
        }
      }}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <IconButton
          style={{margin: 0, padding: 0}}
          icon={name}
          iconColor={disabled ? globalColors.darkGray : globalColors.primary}
        />
        <Text
          style={{
            color: disabled ? globalColors.darkGray : globalColors.primary,
            fontSize: 13,
          }}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

export default TabButton;
