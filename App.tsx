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

//Components
import PUGbutton from './Components/PUGButton';
import ListViewEventsScreen from './Screens/ListViewEventsScreen';
import FooterComponent from './Components/FooterComponent';
import CardListComponent from './Components/CardListComponent';

export default function App() {
  return (

    <ApplicationProvider {...eva} theme={eva.light}>
      <CreateAccountScreen />
    </ApplicationProvider>


    
    //   <ListViewEventsScreen/>
    //   <LoadingLogoScreen/>
    //   <FooterComponent/>
    //   <LoginScreen />
    //   <CreateAccountScreen /> 
    //   <LoadingLogoScreen/> 
    //   <NotificationsScreen />
    //  <FollowingScreen /> 
   
    // <View style={styles.container}>
    //   <Text>In the Dev Branch</Text>
    //   <StatusBar style="auto" />
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
