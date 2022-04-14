import { FC, useState } from "react";
import {  ScrollView, StyleSheet, Image, View, } from "react-native";
import { Switch } from "react-native-paper";
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

import { Ionicons } from '@expo/vector-icons';
import {
  Modal,
  Center,
  Button,
  FormControl,
  Input,
  Select,
  Text,
  CheckIcon,
  Box
} from "native-base";

const SettingsNotificationsComponent: FC = () => {
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

//   if (!fontsLoaded) {
//     return <AppLoading />;
//   }

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={styles.ScrollStyle}>
      <View style={styles.NotificationView }>
        <Text style={styles.TextStyle}>Notifications</Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} style={[styles.SwitchStyle, styles.IconStyle]} />
      </View>

      <View style={styles.NotificationView}>
        <Text style={styles.TextStyle}>Edit Profile</Text>
        <Ionicons name="chevron-forward" size={32} color="#E8F1FF" style={styles.IconStyle} />
      </View>

      <View style={styles.NotificationView}>
        <Text style={styles.TextStyle}>Help</Text>
        <Ionicons name="chevron-forward" size={32} color="#E8F1FF" style={styles.IconStyle} />
      </View>

      <View style={styles.NotificationView}>
        <Text style={styles.TextStyle}>Delete Account</Text>
        <Ionicons name="chevron-forward" size={32} color="#E8F1FF" style={styles.IconStyle} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  ImageStyle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  ScrollStyle: {
    flex: 1,
  },
  TextStyle: {
    color: "white",
    fontSize: 20,
    fontFamily: "Lato_400Regular",
    marginLeft: 35,
  },
  NotificationView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  SwitchStyle: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
  },
  IconStyle: {
    marginRight: 35,
  }
});

export default SettingsNotificationsComponent;