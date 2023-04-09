import {BorderBottom} from '@mui/icons-material';
import {StyleSheet} from 'react-native';
import globalColors from '../../styles/colors';

const profileStyles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    backgroundColor: globalColors.white,
    borderBottomWidth: 1,
    borderBottomColor: globalColors.gray,
    color: globalColors.gray800,
  },
});

export default profileStyles;
