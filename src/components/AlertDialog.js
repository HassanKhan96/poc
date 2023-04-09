import {Button, Dialog, Portal, Text} from 'react-native-paper';
import globalColors from '../styles/colors';

const AlertDialog = ({
  title,
  message,
  visible,
  onDiscard = () => null,
  onConfirm = () => null,
}) => {
  return (
    <Portal>
      <Dialog
        visible={visible}
        style={{backgroundColor: globalColors.white}}
        onDismiss={() => setAlert({message: '', status: false})}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onConfirm}>Yes</Button>
          <Button onPress={onDiscard}>No</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AlertDialog;
