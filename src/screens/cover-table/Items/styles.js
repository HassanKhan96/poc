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

  editItemModal: {
    borderColor: 'yellow',
    justifyContent: 'flex-start',
    backgroundColor: globalColors.white,
  },

  editItemModalBody: {
    paddingTop: 20,
    height: '90%',
    paddingHorizontal: 15,
  },

  editItemCounter: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  editItemContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

export default itemsTabStyle;
