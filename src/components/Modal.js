import {Button, Modal, Portal, Text, TextInput} from 'react-native-paper';

const CustomModal = ({children, visible, setVisible, title}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={{padding: 20, backgroundColor: '#fff'}}>
        <Text variant="headlineLarge" style={{marginBottom: 20}}>
          {title}
        </Text>
        {children}
      </Modal>
    </Portal>
  );
};

export default CustomModal;
