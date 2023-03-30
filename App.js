/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import Login from './src/screens/auth/login/Login';
import {
  Button,
  configureFonts,
  MD3LightTheme,
  Provider as PaperProvider,
  Text,
} from 'react-native-paper';
import globalColors from './src/styles/colors';
import fontsConfig from './src/styles/font';
import Register from './src/screens/auth/register/Register';
import Navigator from './src/navigation/Navigator';
import {realmContext} from './src/context/RealmContext';
import {AppProvider, UserProvider} from '@realm/react';
import config from './config';
import AuthNavigator from './src/navigation/navigators/AuthNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Tables from './src/screens/table/Tables';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './src/navigation/navigators/TabNavigator';
import Loading from './src/components/Loading';
import Menu from './src/screens/menu/Menu';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

const {RealmProvider} = realmContext;
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: globalColors.primary,
    secondary: globalColors.secondary,
  },
  fonts: configureFonts({config: fontsConfig}),
};

const AppWrapper = () => {
  return (
    <PaperProvider theme={theme}>
      <AppProvider id={config.appId} baseUrl={config.baseUrl}>
        <UserProvider fallback={AuthNavigator}>
          <RealmProvider
            sync={{
              flexible: true,
              onError: (_, error) => {
                console.log('realm error: ===', error);
              },
            }}
            fallback={<Loading />}>
            <App />
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    </PaperProvider>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
    // <Menu />
  );
};

export default AppWrapper;
