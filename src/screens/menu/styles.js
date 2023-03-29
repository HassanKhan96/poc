import {StyleSheet} from 'react-native';
import globalColors from '../../styles/colors';

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    padding: 15,
    backgroundColor: globalColors.secondary,
  },
  categoryCard: {
    backgroundColor: globalColors.white,
    maxHeight: 310,
  },
  categoryField: {},
  categoryList: {
    width: '100%',
  },

  itemFilterContainer: {
    marginVertical: 15,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listContainer: {
    paddingHorizontal: 0,
    flex: 1,
  },

  itemCard: {
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: globalColors.white,
  },

  itemInfoContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  itemActionContainer: {
    alignItems: 'flex-end',
  },
  itemActionBtn: {
    marginLeft: 3,
    marginRight: 0,
  },
});

export default menuStyles;
