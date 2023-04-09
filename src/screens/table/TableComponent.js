import {useNavigation} from '@react-navigation/native';
import {Pressable, TouchableWithoutFeedback, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import globalColors from '../../styles/colors';
import styles from './styles';

const TableComponent = ({
  title,
  onLongPress = () => null,
  onPress = () => null,
  order = null,
}) => {
  const navigation = useNavigation();
  console.log(order);
  return (
    <View style={styles.cardContainer}>
      <Pressable onLongPress={onLongPress} onPress={onPress}>
        <Card
          style={[
            styles.card,
            {
              backgroundColor:
                order && order?.isConfirmed
                  ? globalColors.success
                  : globalColors.white,
            },
          ]}>
          <Text
            variant="titleLarge"
            style={
              order && order?.isConfirmed ? {color: globalColors.white} : null
            }>
            {title}
          </Text>
        </Card>
      </Pressable>
    </View>
  );
};

export default TableComponent;
