import {Pressable, TouchableWithoutFeedback, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import styles from './styles';

const TableComponent = ({title, onLongPress = () => null}) => {
  return (
    <View style={styles.cardContainer}>
      <Pressable onLongPress={onLongPress}>
        <Card style={styles.card}>
          <Text variant="titleLarge">{title}</Text>
        </Card>
      </Pressable>
    </View>
  );
};

export default TableComponent;
