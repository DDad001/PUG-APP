import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//Screens
import LoginScreen from './Screens/LoginScreen';
import LoadingLogoScreen from './Screens/LoadingLogoScreen';
import CreateAccountScreen from './Screens/CreateAccountScreen';
import NotificationsScreen from './Screens/NotificationsScreen';
import FollowingScreen from './Screens/FollowingScreen';

//Components
import PUGbutton from './Components/PUGButton';
import ListViewEventsScreen from './Screens/ListViewEventsScreen';
import FooterComponent from './Components/FooterComponent';
import CardListComponent from './Components/CardListComponent';
import EventDisplayedScreen from './Screens/EventDisplayedScreen';
import ProfileScreen from './Screens/ProfileScreen';

export default function App() {
  return (
    <>
      {/* <ListViewEventsScreen/> */}
      <ProfileScreen/>
      {/* <CreateAccountScreen /> */}
      {/* <LoadingLogoScreen/> */}
      {/* <FooterComponent/> */}
      {/* <EventDisplayedScreen/> */}
      {/* <LoginScreen /> */}
      {/* <CreateAccountScreen /> */}
      {/* <LoadingLogoScreen/> */}
      {/* <NotificationsScreen /> */}
      {/* <FollowingScreen /> */}
      <StatusBar style="auto" backgroundColor='black'/>
    </>
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
