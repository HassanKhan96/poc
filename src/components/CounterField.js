import {View} from 'react-native';
import {IconButton, TextInput} from 'react-native-paper';
import globalColors from '../styles/colors';

const CounterField = ({count = 0, onChange = () => null}) => {
  return (
    <View style={{flexDirection: 'row', width: 200, justifyContent: 'center'}}>
      <IconButton
        icon={'plus'}
        style={{borderWidth: 1, borderColor: globalColors.primary}}
        iconColor={globalColors.primary}
        onPress={() => onChange(++count)}
      />
      <TextInput
        value={count.toString()}
        onChangeText={text => {
          if (Number(text) >= 0) onChange(Number(text));
        }}
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
        onPress={() => onChange(--count)}
        disabled={Number(count) == 0}
      />
    </View>
  );
};

export default CounterField;
