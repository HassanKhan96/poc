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

const Category = ({categories}) => {
  return (
    <View style={menuStyles.categorySection}>
      <Card style={menuStyles.categoryCard}>
        <Card.Title title="Category" titleStyle={{fontWeight: '600'}} />
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
                <List.Item
                  style={{
                    paddingRight: 18,
                    paddingLeft: 5,
                    paddingBottom: 0,
                    paddingTop: 0,
                    justifyContent: 'space-between',
                  }}
                  title={item.name}
                  right={({color, style}) => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <IconButton
                          icon={'pencil'}
                          style={{marginRight: 0, padding: 0}}
                          iconColor={globalColors.primary}
                        />
                        <IconButton
                          icon={'trash-can'}
                          style={{marginLeft: 5, padding: 0, marginRight: 0}}
                          iconColor={globalColors.danger}
                        />
                      </View>
                    );
                  }}
                />
              );
            }}
            keyExtractor={item => item.key}
          />
        </Card.Content>
      </Card>
    </View>
  );
};

export default Category;
