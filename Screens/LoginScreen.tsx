import { FC, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  Pressable,
  Image
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import Skater from "../assets/Skateboard.png";
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

const LoginScreen: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  let [fontsLoaded, error] = useFonts({
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
    <View style={styles.container}>
      <ImageBackground
        source={Skater}
        resizeMode="cover"
        style={{ height: "100%", width: "100%" }}
      >
        <View
          style={{
            flex: 0.3,
            alignItems: "center",
            paddingTop: 75,
          }}
        >
          <Text
            style={{
              fontFamily: "Lato_700Bold",
              fontWeight: "bold",
              fontSize: 50,
              color: "white",
              borderColor: "white",
              borderWidth: 5,
              padding: 35,
            }}
          >
            PUG
          </Text>
        </View>
        <View style={{ flex: 0.3, marginTop: 10 }}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Email"
            keyboardType="default"
            placeholderTextColor={"rgba(59, 86, 124, 1)"}
            accessibilityLabel="Enter your email"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="Password"
            keyboardType="default"
            placeholderTextColor={"rgba(59, 86, 124, 1)"}
            accessibilityLabel="Enter your password"
          />
        </View>
        <View style={{ flex: 0.2, alignItems: "center", marginTop: 50 }}>
          <Pressable
            style={{
              backgroundColor: "rgba(10, 50, 109, 1)",
              borderRadius: 50,
            }}
            onPress={() => console.log("Login")}
            accessibilityLabel="Login Button"
          >
            <Text
              style={{
                color: "white",
                fontFamily: "Roboto_400Regular",
                fontSize: 20,
                justifyContent: "center",
                paddingLeft: "30%",
                paddingRight: "30%",
                paddingTop: 20,
                paddingBottom: 20,
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>
        <View style={{flex: 0.2, alignItems: "center"}}>
          <Pressable onPress={() => console.log("Send the user to help!")}>
            <View style={{flexDirection: "row"}}>
                <Text style={{color: "white", fontFamily: "Roboto_400Regular", fontSize: 16 , textDecorationLine: "underline", textDecorationColor: "white", marginRight: 7}}>Need help</Text>
                <FontAwesome name="question-circle-o" size={19} color="white"/>
            </View>
          </Pressable>
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
  input: {
    //Text styling for the input fields!
    height: 55,
    marginTop: 10,
    marginLeft: 18,
    marginRight: 20,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});

export default LoginScreen;
