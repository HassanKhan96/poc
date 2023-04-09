import { StyleSheet } from "react-native";
import globalColors from "../../styles/colors";

const orderStyles = StyleSheet.create({
    ordersContainer: {
    },
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
      itemFooter: {
        marginTop: 10,
        flexDirection: 'row',
        
        justifyContent: 'space-between'
      }
})

export default orderStyles