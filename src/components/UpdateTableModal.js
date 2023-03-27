import {useState} from 'react';
import {Button, Modal, Portal, Text, TextInput} from 'react-native-paper';
import globalColors from '../styles/colors';

const UpdateTableModal = ({
  visible = false,
  setVisible = () => null,
  onUpdate = title => null,
  table = null,
}) => {
  const [title, setTitle] = useState(table?.title);
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={{padding: 20, backgroundColor: '#fff'}}>
        <Text variant="headlineLarge" style={{marginBottom: 20}}>
          Update Table
        </Text>
        <TextInput
          label="Table title"
          mode="outlined"
          value={title}
          onChangeText={text => setTitle(text)}
          outlineColor={globalColors.secondary}
          defaultValue={table?.title ? table?.title : ''}
        />
        <Button
          mode="contained"
          style={{marginTop: 10}}
          onPress={() => {
            if (title) onUpdate(table?._id, title);
          }}>
          Update
        </Button>
      </Modal>
    </Portal>
  );
};

export default UpdateTableModal;
