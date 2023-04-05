import {View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import CounterField from '../../components/CounterField';
import globalColors from '../../styles/colors';
import defaultStyles from '../../styles/defualt.styles';
import coverTableStyles from './styles';

const Items = () => {
  return (
    <View style={[defaultStyles.container, coverTableStyles.container]}>
      <Card style={coverTableStyles.coverFieldContainer}>
        <Card.Title title="Cover" />
        <View style={coverTableStyles.coverInput}>
          <CounterField />
        </View>
      </Card>
      <Card style={coverTableStyles.itemsContainer}>
        <Card.Title title="Items" />
        <Card.Content>
          <Text>No Items selected</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default Items;
