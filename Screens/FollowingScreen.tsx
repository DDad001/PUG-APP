import { FC, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableHighlight,
  Pressable,
} from "react-native";
import FollowingComponent from "../Components/FollowingComponent";
import { FontAwesome } from "@expo/vector-icons";

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

  const [input, setInput] = useState("");

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
        <View style={{ flex: 1, flexDirection: 'row', alignItems: "flex-end", marginTop: 20, justifyContent: 'center', marginBottom: 28, marginLeft: 77, marginRight: 77 }}>
          <View style={{ flex: 0.5}}>
          <Pressable
            style={{
              backgroundColor: "white",
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            onPress={() => console.log("Login")}
            accessibilityLabel="Following Button"
          >
            <Text style={styles.loginBtnTxt}>Following</Text>
          </Pressable>
          </View>
          <View style={{flex: 0.5}}>
          <Pressable
            style={{
              backgroundColor: "white",
              borderBottomRightRadius: 10,
              borderTopRightRadius: 10
            }}
            onPress={() => console.log("Login")}
            accessibilityLabel="Followers Button"
          >
            <Text style={styles.loginBtnTxt}>Followers</Text>
          </Pressable>
          </View>
          
          
        </View>

        <View style={{ flexDirection: "row", justifyContent: 'center', paddingBottom: 33, }}>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setInput(text)}
              onSubmitEditing={() => {
                alert(`Your message is: ${input}`);
                setInput("");
              }}
              value={input}
              placeholder="Search following"
              placeholderTextColor={"#959494"}
            />
          </View>
          <TouchableHighlight>
            <View
              style={{
                backgroundColor: "#0A326D",
                width: 54,
                height: 45,
                marginTop: 18,
                borderBottomRightRadius: 7,
                borderTopRightRadius: 7,
              }}
            >
              <FontAwesome
                name="search"
                size={15}
                color="white"
                style={{ marginTop: 14, marginLeft: 17 }}
              />
            </View>
          </TouchableHighlight>
        </View>

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
    flex: 6,
    // marginTop: 104,
  },
  FollowingText: {
    fontFamily: "Lato_400Regular",
    fontStyle: "normal",
    fontWeight: "800",
    color: "white",
    fontSize: 32,
    marginBottom: 5,
    marginLeft: 25,
  },
  input: {
    marginLeft: 10,
    marginTop: 18,
    width: 300,
    height: 45,
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 1,
    borderTopStartRadius: 7,
    borderBottomStartRadius: 7,
    padding: 10,
  },
  loginBtnTxt:{
    color: '#0A326D',
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    fontWeight: '600',
    justifyContent: "center",
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: "10%",
    paddingBottom: "10%",
  },
  
});

export default FollowingScreen;
