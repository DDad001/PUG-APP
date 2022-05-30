import { FC } from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import SettingsProfileComponent from "../Components/SettingsProfileComponent";
import SettingsNotificationsComponent from "../Components/SettingsNotificationsComponent";
import SignoutBtnComponent from "../Components/SignoutBtnComponent";

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

import VolleyballPicture from "../assets/VolleyBall.png";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Nav: undefined;
  event: { name: string };
  profile: { name: string };
  PastEvents: undefined;
  LikedEvents: undefined;
  settings: undefined;
  EditProfile: undefined;
  following: undefined;
  LookAtEvent: undefined;
  OtherPersonsFollowers: undefined;
  OtherPersonsFollowings: undefined;
  YourActiveEvents: undefined;
  followers: undefined;
  FAQ: undefined;
  login: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList, "Nav">;

const SettingsScreen: FC<Props> = ({ navigation, route }) => {
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
        source={VolleyballPicture}
        resizeMode="cover"
        style={{ height: "100%", width: "100%", backgroundColor: "#0A326D" }}
      >
        <View style={styles.overlayContainer}>
          <SettingsProfileComponent />
          <SettingsNotificationsComponent
            onHelpPress={() => navigation.navigate("FAQ")}
            onEditProfilePress={() => navigation.navigate("EditProfile")}
            onDeleteAccountPress={() => navigation.navigate("login")}
          />
          <SignoutBtnComponent
            onSignOutPress={() => navigation.navigate("login")}
          />
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
  },
});

export default SettingsScreen;
