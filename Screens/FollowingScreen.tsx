import { FC } from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import FollowingComponent from "../Components/FollowingComponent";

import AppLoading from "expo-app-loading";
import {
  useFonts,
  Lato_100Thin,
  Lato_100Thin_Italic,
  Lato_300Light,
  Lato_300Light_Italic,
  Lato_400Regular,
  Lato_400Regular_Italic,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
  Lato_900Black_Italic,
} from "@expo-google-fonts/lato";

import BaseballPicture from "../assets/BaseballGlove.png";

const FollowingScreen: FC = () => {
  let [fontsLoaded] = useFonts({
    Lato_100Thin,
    Lato_100Thin_Italic,
    Lato_300Light,
    Lato_300Light_Italic,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
    Lato_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={BaseballPicture}
        resizeMode="cover"
        style={{ height: "100%", width: "100%", backgroundColor: "#0A326D" }}
      >
       <View style={styles.overlayContainer}>
          <Text style={styles.FollowingText}>Following</Text>
          <FollowingComponent />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlayContainer: {
    flex: 1,
    marginTop: 104,
    marginLeft: 27,
  },
  FollowingText: {
    fontFamily: "Lato_400Regular",
    fontStyle: "normal",
    fontWeight: "800",
    color: "white",
    fontSize: 32,
    marginBottom: 5,
  },
});

export default FollowingScreen;