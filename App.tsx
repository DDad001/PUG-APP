import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout } from "@ui-kitten/components";

//Screens
import LoginScreen from "./Screens/LoginScreen";
import LoadingLogoScreen from "./Screens/LoadingLogoScreen";
import CreateAccountScreen from "./Screens/CreateAccountScreen";
import NotificationsScreen from "./Screens/NotificationsScreen";
import FollowingScreen from "./Screens/FollowingScreen";
import SettingsScreen from "./Screens/SettingsScreen";
import PassedLikedEventsScreen from "./Screens/PassedLikedEventsScreen";
import AddEventScreen from "./Screens/AddEventScreen";

//Components
import PUGbutton from "./Components/PUGButton";
import ListViewEventsScreen from "./Screens/ListViewEventsScreen";
import FooterComponent from "./Components/FooterComponent";
import CardListComponent from "./Components/CardListComponent";
import EventDisplayedScreen from "./Screens/EventDisplayedScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";

import useUser from './Hooks/use-user';
import UserContext from './Context/UserContext';


import { GetAllFriends } from './Services/DataService';
import { useEffect, useState } from 'react';

export default function App() {

  const [allFriends, setAllFriends] = useState([]);

  useEffect(() => {
    fetchFriend();
  }, [])

  const fetchFriend = async () => {
    let results = await GetAllFriends();
    setAllFriends(results.value)
    console.log(results);
  }

  return (
    <UserContext.Provider value={useUser()}>
      
      <NavigationContainer>
        <ApplicationProvider {...eva} theme={eva.light}>
          <NativeBaseProvider>
            <AddEventScreen />
            {/* <PassedLikedEventsScreen/> */}
            {/* <ProfileScreen/> */}
            {/* <CreateAccountScreen /> */}
            {/* <SettingsScreen /> */}
          </NativeBaseProvider>
        </ApplicationProvider>
      </NavigationContainer>
    
    </UserContext.Provider>
    

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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
