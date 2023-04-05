import {useNavigation} from '@react-navigation/native';
import {Pressable, TouchableWithoutFeedback, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import styles from './styles';

const TableComponent = ({title, onLongPress = () => null}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.cardContainer}>
      <Pressable
        onLongPress={onLongPress}
        onPress={() => navigation.navigate('Cover', {name: title})}>
        <Card style={styles.card}>
          <Text variant="titleLarge">{title}</Text>
        </Card>
      </Pressable>
    </View>
  );
};

export default TableComponent;
