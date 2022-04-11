import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//Screens
import LoginScreen from './Screens/LoginScreen';
import LoadingLogoScreen from './Screens/LoadingLogoScreen';
import CreateAccountScreen from './Screens/CreateAccountScreen';
import NotificationsScreen from './Screens/NotificationsScreen';

//Components
import PUGbutton from './Components/PUGButton';

export default function App() {
  return (
    <>
      <LoginScreen />
      {/* <CreateAccountScreen /> */}
      {/* <LoadingLogoScreen/> */}
      {/* <NotificationsScreen /> */}
    </>
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
