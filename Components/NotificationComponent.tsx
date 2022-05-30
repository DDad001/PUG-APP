import { FC } from "react";
import { Text, ScrollView, StyleSheet, Image, View } from "react-native";
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

import {
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";

import Skier from "../assets/Skier.png";

const NotificationComponent: FC = () => {
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
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (

    <View style={styles.NotificationView}>
      <Image source={Skier} style={styles.ImageStyle} />
      <View style={{ justifyContent: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.TextStyle}>Scott Morenzone </Text>
          <Text style={styles.MiddleTextStyle}>liked</Text>
          <Text style={styles.TextStyle}> your post</Text>
        </View>
      </View>
    </View>


  );
};

const styles = StyleSheet.create({
  ImageStyle: {
    height: 70,
    width: 70,
    borderRadius: 50,
    marginRight: 20,
  },
  TextStyle: {
    color: "white",
    fontSize: 16,
    fontFamily: "Lato_700Bold",
  },
  TimeText: {
    color: "#DFE6F5",
    fontSize: 13,
    paddingTop: 5,
    fontFamily: "Roboto_500Medium",
  },
  NotificationView: {
    flexDirection: "row",
    paddingTop: 5,
    paddingBottom: 34,
  },
  MiddleTextStyle: {
    color: "white",
    fontSize: 16,
    fontFamily: "Lato_300Light",
  },
});

export default NotificationComponent;
