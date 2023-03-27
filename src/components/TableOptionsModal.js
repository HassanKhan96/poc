import {useState} from 'react';
import {Button, Modal, Portal, TextInput} from 'react-native-paper';
import globalColors from '../styles/colors';

const TableOptionsModal = ({
  visible = false,
  setVisible = () => null,
  onDelete = () => null,
  onUpdate = () => null,
  table = null,
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={{padding: 20, backgroundColor: '#fff'}}>
        <Button mode="contained" style={{margin: 10}} onPress={onUpdate}>
          Update Table
        </Button>
        <Button
          mode="contained"
          style={{margin: 10}}
          onPress={() => onDelete(table?._id)}>
          Delete Table
        </Button>
      </Modal>
    </Portal>
  );
};

export default TableOptionsModal;
