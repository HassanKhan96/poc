import {View} from 'react-native';
import {IconButton, TextInput} from 'react-native-paper';
import globalColors from '../styles/colors';

const CounterField = () => {
  return (
    <View style={{flexDirection: 'row', width: 200, justifyContent: 'center'}}>
      <IconButton
        icon={'plus'}
        style={{borderWidth: 1, borderColor: globalColors.primary}}
        iconColor={globalColors.primary}
      />
      <TextInput
        defaultValue={'0'}
        style={{
          flexGrow: 1,
          flexShrink: 1,
          textAlign: 'center',
          color: globalColors.black,
        }}
        keyboardType="number-pad"
        contentStyle={{backgroundColor: globalColors.white}}
        underlineColor={globalColors.gray}
      />
      <IconButton
        icon={'minus'}
        style={{borderWidth: 1, borderColor: globalColors.danger}}
        iconColor={globalColors.danger}
      />
    </View>
  );
};

export default CounterField;
