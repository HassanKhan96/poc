const {Snackbar, Portal} = require('react-native-paper');

const SnackMessage = ({visible, onClose, message}) => {
  return (
    <Portal>
      <Snackbar
        visible={visible}
        onDismiss={onClose}
        action={{
          label: 'Close',
          onPress: () => onClose(),
        }}>
        {message}
      </Snackbar>
    </Portal>
  );
};

export default SnackMessage;
