import {useState} from 'react';
import {Button, Modal, Portal, Text, TextInput} from 'react-native-paper';
import {View} from 'react-native';
import globalColors from '../styles/colors';

const AddTableModal = ({
  visible = false,
  setVisible = () => null,
  onAdd = title => null,
}) => {
  const [title, setTitle] = useState('');
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={{padding: 20, backgroundColor: '#fff'}}>
        <Text variant="headlineLarge" style={{marginBottom: 20}}>
          Add Table
        </Text>
        <TextInput
          label="Table title"
          mode="outlined"
          value={title}
          onChangeText={text => setTitle(text)}
          outlineColor={globalColors.secondary}
        />
        <Button
          mode="contained"
          style={{marginTop: 10}}
          onPress={() => {
            if (title) onAdd(title);
            setTitle('');
          }}>
          Add
        </Button>
      </Modal>
    </Portal>
  );
};

export default AddTableModal;
