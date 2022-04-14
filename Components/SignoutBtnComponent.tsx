import { FC } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
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
//You can't style a button have to use a pressable!
const SignoutBtnComponent: FC = () => {
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
        <Pressable style={{backgroundColor: "#7E90AB", borderRadius: 50, alignItems: "center", marginLeft: 50, marginRight: 50}} onPress={() => console.log("Take Me Home!!!!")} accessibilityLabel="Take Me Home" >
            <Text style={{ color: "white",
    fontFamily: "Roboto_400Regular",
    fontSize: 24,
    justifyContent: "center",
    paddingTop: 25,
    paddingBottom: 25}}>Sign out</Text>
        </Pressable>
      </View>
    
  );
};

const styles = StyleSheet.create({
  BtnBox: {
    color: "white",
    fontFamily: 'Roboto_400Regular',
    fontSize: 24,
    paddingRight: 117,
    paddingTop: 24,
    paddingLeft: 117,
    paddingBottom: 24,
    backgroundColor: "#7E90AB",
    borderRadius: 10,
  },
  Btn: {
    
  },
  NotificationView: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center'
  },
});

export default SignoutBtnComponent;