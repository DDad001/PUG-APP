import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout } from '@ui-kitten/components';

//Screens
import LoginScreen from './Screens/LoginScreen';
import LoadingLogoScreen from './Screens/LoadingLogoScreen';
import CreateAccountScreen from './Screens/CreateAccountScreen';
import NotificationsScreen from './Screens/NotificationsScreen';
import FollowingScreen from './Screens/FollowingScreen';
import SettingsScreen from './Screens/SettingsScreen';
import PassedLikedEventsScreen from './Screens/PassedLikedEventsScreen';
import AddEventScreen from './Screens/AddEventScreen';

//Components
import PUGbutton from './Components/PUGButton';
import ListViewEventsScreen from './Screens/ListViewEventsScreen';
import FooterComponent from './Components/FooterComponent';
import CardListComponent from './Components/CardListComponent';
import EventDisplayedScreen from './Screens/EventDisplayedScreen';
import ProfileScreen from './Screens/ProfileScreen';

export default function App() {
  return (

    <ApplicationProvider {...eva} theme={eva.light}>
      {/* <AddEventScreen /> */}
      <PassedLikedEventsScreen/>
      {/* <CreateAccountScreen /> */}
    </ApplicationProvider>


    
  // <PassedLikedEventsScreen />
    // <CreateAccountScreen />
    //   <LoadingLogoScreen/>
    //   <LoginScreen />
    //   <CreateAccountScreen /> 
    //   <LoadingLogoScreen/> 
    //   <NotificationsScreen />
    //  <FollowingScreen /> 
    // <SettingsScreen />
   
    // <View style={styles.container}>
    //   <Text>In the Dev Branch</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
