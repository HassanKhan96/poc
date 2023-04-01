const {Snackbar} = require('react-native-paper');

const SnackMessage = ({visible, onClose, message}) => {
  return (
    <Snackbar
      style={{width: '100%'}}
      visible={visible}
      onDismiss={onClose}
      action={{
        label: 'Close',
        onPress: () => onClose(),
      }}>
      {message}
    </Snackbar>
  );
};

export default SnackMessage;
