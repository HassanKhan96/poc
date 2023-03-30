import { useState } from "react"
import { Pressable, View } from "react-native"
import { Button, Menu, Text, TextInput } from "react-native-paper"
import globalColors from "../styles/colors"
import CustomModal from "./Modal"
import Icon from 'react-native-vector-icons/AntDesign';
import { realmContext } from "../context/RealmContext"


const ItemModal = ({ visible, setVisible, title }) => {
    const [showMenu, setShowMenu] = useState(false)
    const [selectCategory, setSelectCategory] = useState('')
    const { useRealm } = realmContext
    const realm = useRealm()
    
    return (
        <CustomModal setVisible={setVisible} visible={visible} title={title}>
            <TextInput
                mode="outlined"
                style={{ backgroundColor: globalColors.white, fontSize: 13, marginBottom: 10 }}
                label="Name"
                outlineColor={globalColors.gray}
            />
            <TextInput
                mode="outlined"
                style={{ backgroundColor: globalColors.white, fontSize: 13, marginBottom: 10 }}
                label="Price"
                outlineColor={globalColors.gray}
                keyboardType='numeric'
            />
            <TextInput
                mode="outlined"
                style={{ backgroundColor: globalColors.white, fontSize: 13, marginBottom: 10 }}
                label="Tabeaway Price"
                outlineColor={globalColors.gray}
                keyboardType='numeric'
            />

            <Pressable onPress={() => setShowMenu(true)}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        height: 30,
                        minWidth: 100,
                    }}>
                    <Text variant="labelMedium" style={{ marginRight: 5 }}>
                        {selectCategory}
                    </Text>
                    <Menu
                        visible={showMenu}
                        anchor={
                            <Pressable onPress={() => setShowMenu(true)}>
                                <Icon
                                    name="caretdown"
                                    size={18}
                                    color={globalColors.gray800}
                                />
                            </Pressable>
                        }
                        onDismiss={() => setShowMenu(false)}>
                        {categories.map(category => {
                            return (
                                <Menu.Item
                                    key={category.key}
                                    title={category?.name}
                                    onPress={() => setSelectCategory(category?.name)}
                                />
                            );
                        })}
                    </Menu>
                </View>
            </Pressable>
            <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', marginTop: 10 }}>
                <Button mode="contained" buttonColor={globalColors.primary} style={{ marginBottom: 10 }}>Add</Button>
                <Button mode="contained" buttonColor={globalColors.danger} style={{ marginBottom: 10 }} onPress={() => setVisible(false)}>Cancel</Button>
            </View>
        </CustomModal>
    )
}

export default ItemModal