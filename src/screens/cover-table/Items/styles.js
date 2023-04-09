import {StyleSheet} from 'react-native';
import globalColors from '../../../styles/colors';

const itemsTabStyle = StyleSheet.create({
  itemsContainer: {
    backgroundColor: globalColors.white,
    marginTop: 20,
  },
  itemAmountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomColor: globalColors.gray,
    borderBottomWidth: 1,
  },
  itemAmountTitle: {
    color: globalColors.darkGray,
  },

  bottomBar: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default itemsTabStyle;
