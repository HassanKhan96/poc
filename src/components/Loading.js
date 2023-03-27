import {View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <ActivityIndicator size={'large'} />
      <Text variant="titleMedium" style={{marginTop: 5}}>
        Please Wait
      </Text>
    </View>
  );
};

export default Loading;
