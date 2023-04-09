/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useMemo, useState} from 'react';
import {
  configureFonts,
  MD3LightTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import globalColors from './src/styles/colors';
import fontsConfig from './src/styles/font';
import {realmContext} from './src/context/RealmContext';
import {AppProvider, UserProvider} from '@realm/react';
import config from './config';
import AuthNavigator from './src/navigation/navigators/AuthNavigator';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './src/navigation/navigators/TabNavigator';
import Loading from './src/components/Loading';
import ProfileContext from './src/context/profileContext';

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
  const [profile, setProfile] = useState({managerMode: false});
  const value = useMemo(() => ({profile, setProfile}), [profile]);
  return (
    <ProfileContext.Provider value={value}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </ProfileContext.Provider>
  );
};

export default AppWrapper;
