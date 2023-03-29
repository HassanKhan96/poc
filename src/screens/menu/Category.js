import {
  Button,
  Card,
  IconButton,
  List,
  Text,
  TextInput,
} from 'react-native-paper';
import {FlatList, View} from 'react-native';
import menuStyles from './styles';
import globalColors from '../../styles/colors';
import {memo} from 'react';

const Category = ({categories}) => {
  return (
    <View style={menuStyles.container}>
      {/* <Card style={menuStyles.categoryCard}> */}
      <View style={menuStyles.categoryField}>
        <TextInput
          mode="outlined"
          style={{backgroundColor: globalColors.white, fontSize: 13}}
          label="Add Category"
          outlineColor={globalColors.gray}
          right={
            <TextInput.Icon icon="plus-box" iconColor={globalColors.green} />
          }
        />
      </View>
      <Card.Content
        style={{
          paddingLeft: 0,
          paddingRight: 0,
          marginTop: 10,
          height: '100%',
          flexGrow: 1,
          flexShrink: 1,
        }}>
        <FlatList
          data={categories}
          style={{width: '100%'}}
          showsVerticalScrollIndicator={true}
          renderItem={({item, index}) => {
            return (
              <Card style={menuStyles.itemCard}>
                <View style={menuStyles.itemContainer}>
                  <Text variant="titleMedium">{item?.name}</Text>
                  <View style={menuStyles.itemActionContainer}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <IconButton
                        icon={'pencil'}
                        style={menuStyles.itemActionBtn}
                        size={20}
                        iconColor={globalColors.primary}
                      />
                      <IconButton
                        size={20}
                        icon={'trash-can'}
                        style={menuStyles.itemActionBtn}
                        iconColor={globalColors.danger}
                      />
                    </View>
                  </View>
                </View>
              </Card>
            );
          }}
          keyExtractor={item => item.key}
        />
      </Card.Content>
      {/* </Card> */}
    </View>
  );
};

export default memo(Category);
