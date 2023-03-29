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

const MenuItems = ({menuItems}) => {
  return (
    <View style={menuStyles.categorySection}>
      {/* <Card style={menuStyles.categoryCard}> */}
      <Card.Title
        title="Items"
        titleStyle={{fontWeight: '600'}}
        right={() => (
          <IconButton icon="plus-box" iconColor={globalColors.green} />
        )}
      />
      <View style={menuStyles.categoryField}>
        <TextInput
          mode="outlined"
          style={{backgroundColor: globalColors.white}}
          label="Search"
          outlineColor={globalColors.gray}
          right={
            <TextInput.Icon icon="magnify" iconColor={globalColors.gray} />
          }
        />
      </View>
      <Card.Content
        style={{
          paddingLeft: 5,
          paddingRight: 5,
          marginTop: 5,
          flexGrow: 1,
          flexShrink: 1,
        }}>
        <FlatList
          data={menuItems}
          style={{width: '100%'}}
          showsVerticalScrollIndicator={true}
          renderItem={({item, index}) => {
            return (
              <Card
                style={{
                  marginVertical: 5,
                  backgroundColor: globalColors.white,
                  borderWidth: 1,
                }}
                // title={item.name}
                // description={`Price: £${item.price}`}
                // right={({color, style}) => {
                //   return (
                //     <View
                //       style={{
                //         flexDirection: 'row',
                //       }}>
                //       <IconButton
                //         icon={'pencil'}
                //         style={{marginRight: 0, padding: 0}}
                //         iconColor={globalColors.primary}
                //       />
                //       <IconButton
                //         icon={'trash-can'}
                //         style={{marginLeft: 5, padding: 0, marginRight: 0}}
                //         iconColor={globalColors.danger}
                //       />
                //     </View>
                //   );
                // }}
              >
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Card.Title
                    style={{borderWidth: 1}}
                    subtitleStyle={{color: '#999'}}
                    title={item.name}
                    subtitle={item.category}
                  />
                  <Card.Content style={{borderWidth: 1}}>
                    <Text>Price: £{item.price}</Text>
                  </Card.Content>
                  <Card.Actions style={{borderWidth: 1}}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <IconButton
                        icon={'pencil'}
                        iconColor={globalColors.primary}
                      />
                      <IconButton
                        icon={'trash-can'}
                        iconColor={globalColors.danger}
                      />
                    </View>
                  </Card.Actions>
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

export default MenuItems;
