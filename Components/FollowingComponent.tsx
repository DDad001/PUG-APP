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

const FollowingComponent: FC = () => {
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
    <ScrollView style={styles.ScrollStyle}>

      <View style={styles.NotificationView}>
        <Image source={Skier} style={styles.ImageStyle} />
        <View style={{ justifyContent: "center" }}>
            <Text style={styles.TextStyle}>Scott Morenzone </Text>
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ImageStyle: {
    height: 70,
    width: 70,
    borderRadius: 50,
    marginRight: 20,
  },
  ScrollStyle: {
    paddingTop: 10,
  },
  TextStyle: {
    color: "white",
    fontSize: 24,
    fontFamily: "Roboto_500Medium",
    fontWeight: '500',
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

export default FollowingComponent;
