import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {View} from 'react-native';
import {Button, Card, Modal, Portal} from 'react-native-paper';
import coverTableStyles from '../screens/cover-table/styles';
import globalColors from '../styles/colors';
import CounterField from './CounterField';

const TableCoverModal = ({visible, onDismiss, table = null}) => {
  const [coverCount, setCoverCount] = useState(0);
  const navigation = useNavigation();
  return (
    <Portal>
      <Modal
        style={{marginHorizontal: 20}}
        visible={visible}
        onDismiss={onDismiss}>
        <Card style={coverTableStyles.coverFieldContainer}>
          <Card.Title title="Cover Table" titleVariant="titleMedium" />
          <View style={coverTableStyles.coverInput}>
            <CounterField count={coverCount} onChange={setCoverCount} />
          </View>
          <View style={{margin: 20}}>
            {coverCount === 0 ? (
              <Button mode="contained" buttonColor={globalColors.danger}>
                Close
              </Button>
            ) : (
              <Button
                mode="contained"
                onPress={() => {
                  navigation.navigate('Cover', {
                    name: table?.title,
                    table,
                  });
                  onDismiss();
                  setCoverCount(0);
                }}>
                Cover
              </Button>
            )}
          </View>
        </Card>
      </Modal>
    </Portal>
  );
};

export default TableCoverModal;
