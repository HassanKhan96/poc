import {FlatList, View} from 'react-native';
import {Button, Card, IconButton, List, Text} from 'react-native-paper';
import menuStyles from './styles';
import styles from '../../styles/defualt.styles';
import globalColors from '../../styles/colors';

const Menu = () => {
  const categories = [
    {
      key: '1',
      name: 'Sea Food',
    },
    {
      key: '2',
      name: 'Fast Food',
    },
    {
      key: '3',
      name: 'Chinese',
    },
    {
      key: '4',
      name: 'Italian',
    },
    {
      key: '5',
      name: 'Rice',
    },
    {
      key: '6',
      name: 'Maxican',
    },
    {
      key: '7',
      name: 'Indian',
    },
  ];
  return (
    <View style={[styles.container, menuStyles.container]}>
      <View style={menuStyles.categorySection}>
        <Card style={menuStyles.categoryCard}>
          <Card.Title
            title="Category"
            right={() => <Button icon="plus-box">Add</Button>}
          />
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
              renderItem={({item, index}) => {
                return (
                  <List.Item
                    style={{
                      paddingRight: 5,
                      paddingLeft: 0,
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
    </View>
  );
};

export default Menu;
