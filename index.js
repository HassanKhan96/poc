/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import AppWrapper from './App';

AppRegistry.registerComponent(appName, () => AppWrapper);
