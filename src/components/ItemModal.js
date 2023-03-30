import { View } from "react-native"
import { Button, TextInput } from "react-native-paper"
import globalColors from "../styles/colors"
import CustomModal from "./Modal"

const ItemModal = ({ visible, setVisible, title}) => {
    return (
        <CustomModal setVisible={setVisible} visible={visible} title={title}>
            <TextInput 
                 mode="outlined"
                 style={{backgroundColor: globalColors.white, fontSize: 13, marginBottom: 10}}
                 label="Name"
                 outlineColor={globalColors.gray}
            />
            <TextInput 
                 mode="outlined"
                 style={{backgroundColor: globalColors.white, fontSize: 13, marginBottom: 10}}
                 label="Price"
                 outlineColor={globalColors.gray}
                 keyboardType='numeric'
            />
             <TextInput 
                 mode="outlined"
                 style={{backgroundColor: globalColors.white, fontSize: 13, marginBottom: 10}}
                 label="Tabeaway Price"
                 outlineColor={globalColors.gray}
                 keyboardType='numeric'
            />
            <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', marginTop: 10}}>
            <Button mode="contained" buttonColor={globalColors.primary} style={{ marginBottom: 10}}>Add</Button>
            <Button mode="contained" buttonColor={globalColors.danger} style={{ marginBottom: 10}} onPress={() => setVisible(false)}>Cancel</Button>
            </View>
        </CustomModal>
    )
}

export default ItemModal