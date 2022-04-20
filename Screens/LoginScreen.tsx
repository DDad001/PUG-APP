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

import { LoginUser, GetUserByUsername } from '../Services/DataService';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList ={
  login:undefined,
  Nav: undefined,
  event:{name:string},
  profile:{name:string},
  PastEvents:undefined,
  LikedEvents:undefined,
  settings:undefined,
  following:undefined,
  LookAtEvent:undefined,
  OtherPersonsFollowers:undefined,
  OtherPersonsFollowings:undefined,
  YourActiveEvents:undefined,
  followers:undefined,
  FAQ:undefined,
}

type Props = NativeStackScreenProps<RootStackParamList, "login">;

const LoginScreen: FC<Props> = ({navigation}) => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  // interface LoginProps {
  //   Username:string;
  //   Password:string;
  // }

  const handleLogin = async () => {
    let userData = { 
        Username: Username,
        Password: Password
    };
    let token = await LoginUser(userData);
    if(token.token != null){
      AsyncStorage.setItem("Token", token.token);
      navigation.navigate('Nav');
      GetUserByUsername(Username);
      console.log(token); 
  }
}


// const [allFriends, setAllFriends] = useState([]);
// useEffect(() => {
//   fetchFriend();
// }, [])

// const fetchFriend = async () => {
//   let results = await GetAllFriends();
//   setAllFriends(results.value)
//   console.log(results);
// }


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
        style={styles.overlay}
      >
        <View
          style={{
            flex: 0.35,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 50,
          }}
        >
          <Text style={styles.headingTxt}>PUG</Text>
        </View>
        <View style={{ flex: 0.3}}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setUsername(text)}
            value={Username}
            placeholder="Email"
            keyboardType="default"
            placeholderTextColor={"rgba(59, 86, 124, 1)"}
            accessibilityLabel="Enter your email"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            value={Password}
            secureTextEntry={true}
            placeholder="Password"
            keyboardType="default"
            placeholderTextColor={"rgba(59, 86, 124, 1)"}
            accessibilityLabel="Enter your password"
          />
        </View>
        <View style={{ flex: 0.15, alignItems: "center"}}>
          <Pressable
            style={{
              backgroundColor: "rgba(10, 50, 109, 1)",
              borderRadius: 50,
              paddingLeft: 100, paddingRight: 100
            }}
            onPress={handleLogin}
            accessibilityLabel="Login Button"
          >
            <Text style={styles.loginBtnTxt}>Login</Text>
          </Pressable>
        </View>
        <View style={{flex: 0.1, flexDirection: "row", justifyContent: "center"}}>
            <Text style={styles.subTxtNoUnderline}>Don't have an account?</Text>
            <Pressable onPress={() => console.log("Send the user to the create account screen")} accessibilityLabel="If you don">
                <Text style={styles.subTxt}>Sign up here!</Text>
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
  overlay:{
      flex: 1,
      width: "100%",
      height: "100%"
  },
  headingTxt:{
    fontFamily: "Lato_700Bold",
    fontWeight: "bold",
    fontSize: 50,
    color: "white",
    borderColor: "white",
    borderWidth: 5,
    padding: 35,
  },
  input: {
    fontFamily: "Roboto_400Regular",
    color: "rgba(59, 86, 124, 1)",
    fontSize: 15,
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
  loginBtnTxt:{
    color: "white",
    fontFamily: "Roboto_400Regular",
    fontSize: 20,
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  subTxt:{
    color: "white",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    textDecorationLine: "underline",
    textDecorationColor: "white",
    marginRight: 7
  },
  subTxtNoUnderline:{
    color: "white",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    textDecorationColor: "white",
    marginRight: 7
  }
});

export default LoginScreen;
