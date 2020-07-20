import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import JumbleComponent from './src/components/jumble/JumbleComponent';
import HomeComponent from './src/components/HomeComponent';
import Amplify from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config)

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);

const navigator = createStackNavigator(
  {
    Home: HomeComponent,
    Jumble: JumbleComponent
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App"
    }
  }
);

export default createAppContainer(navigator);
