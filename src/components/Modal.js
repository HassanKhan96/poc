import {Button, Modal, Portal, Text, TextInput} from 'react-native-paper';

const CustomModal = ({children, visible, setVisible, title}) => {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={() => setVisible(false)}>
        {children}
      </Modal>
    </Portal>
  );
};

export default CustomModal;
