import { FC, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  ScrollView,
  Pressable,
} from "react-native";
import { Datepicker, Icon, Layout } from "@ui-kitten/components";

import PUGbutton from "../Components/PUGButton";
import CourtPicture from "../assets/Court.png";
import AppLoading from "expo-app-loading";
import { FontAwesome } from "@expo/vector-icons";
import {
  useFonts,
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

const CreateAccountScreen: FC = () => {
  const [newFirstName, setNewFirstName] = useState<string>("");
  const [newLastName, setNewLastName] = useState<string>("");
  const [newUsername, setNewUsername] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const [date, setDate] = useState<Date>(new Date());

  //place holders Not actually being used!
  const [DOB, setDOB] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");

  let [fontsLoaded, error] = useFonts({
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
        source={CourtPicture}
        resizeMode="cover"
        style={{ height: "100%", width: "100%" }}
      >
        <ScrollView style={[styles.overlayContainer, { marginTop: 50 }]}>
          <View
            style={{
              flex: 0.05,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <View style={{}}>
              <Text style={styles.headingTxt}>
                Want to upload your first event?
              </Text>
            </View>
          </View>
          <View style={{ flex: 0.05, alignItems: "center", marginBottom: 20 }}>
            <Text style={styles.subheadingTxt}>
              Join the PUG family to create your account.
            </Text>
          </View>
          <View style={{ flex: 0.7 }}>
            <TextInput
              style={[styles.input, { marginTop: 0 }]}
              onChangeText={(text) => setNewFirstName(text)}
              value={newFirstName}
              placeholder="First name"
              keyboardType="default"
              placeholderTextColor={"rgba(59, 86, 124, 1)"}
              accessibilityLabel="Enter first name"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => setNewLastName(text)}
              value={newLastName}
              placeholder="Last name"
              keyboardType="default"
              placeholderTextColor={"rgba(59, 86, 124, 1)"}
              accessibilityLabel="Enter last name"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => setNewUsername(text)}
              value={newUsername}
              placeholder="Username"
              keyboardType="default"
              placeholderTextColor={"rgba(59, 86, 124, 1)"}
              accessibilityLabel="Enter username"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => setNewPassword(text)}
              value={newPassword}
              placeholder="Password"
              keyboardType="default"
              placeholderTextColor={"rgba(59, 86, 124, 1)"}
              accessibilityLabel="Enter password"
            />
            {/* What the hell does "layout do!!!" */}
            <Datepicker
              style={[styles.input, {}]}
              // date={new Date(2000, 0, 1)}
              initialVisibleDate={new Date(2000, 0, 1)}
              date={date}
              min={new Date(1900, 0, 0)}
              max={new Date(2004, 7, 4)}
              onSelect={(nextDate) => setDate(nextDate)}
            />
            {/* State dropdown and city input field! */}
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <TextInput
                  style={styles.stateInput}
                  onChangeText={(text) => setState(text)}
                  value={state}
                  placeholder="State"
                  keyboardType="default"
                  placeholderTextColor={"rgba(59, 86, 124, 1)"}
                  accessibilityLabel="Enter the state you reside in"
                />
              </View>
              <TextInput
                style={styles.cityInput}
                onChangeText={(text) => setCity(text)}
                value={city}
                placeholder="City"
                keyboardType="default"
                placeholderTextColor={"rgba(59, 86, 124, 1)"}
                accessibilityLabel="Enter the city you reside in"
              />
            </View>
          </View>
          {/* Flex losses all meaning when scroll view is used! Disregard logic with flex below! */}
          <View style={{ flex: 0.2, alignItems: "center", marginTop: 20 }}>
            <Pressable
              style={{
                backgroundColor: "rgba(10, 50, 109, 1)",
                borderRadius: 50,
                paddingLeft: 60,
                paddingRight: 60,
              }}
              onPress={() => console.log("Create account")}
            >
              <Text style={styles.createAccountBtnTxt}>Create Account</Text>
            </Pressable>
          </View>
          <View style={{ flex: 0.2, alignItems: "center", marginTop: 25 }}>
            <Pressable
              onPress={() => console.log("Send the user to help!")}
              accessibilityLabel="Click here if you need help?"
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.subTxt}>Need help</Text>
                <FontAwesome name="question-circle-o" size={19} color="white" />
              </View>
            </Pressable>
          </View>
        </ScrollView>
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
  headingTxt: {
    color: "white",
    fontWeight: "600",
    fontFamily: "Roboto_700Bold",
    fontSize: 24,
    // marginTop: 30,
  },
  subheadingTxt: {
    fontSize: 16,
    paddingLeft: 15,
    color: "white",
  },
  input: {
    //Text styling for the input fields!
    fontFamily: "Roboto_400Regular",
    color: "rgba(59, 86, 124, 1)",
    fontSize: 15,
    height: 55,
    // marginTop: 10,
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
  stateInput: {
    fontFamily: "Roboto_400Regular",
    color: "rgba(59, 86, 124, 1)",
    fontSize: 15,
    height: 55,
    width: 150,
    // marginTop: 10,
    marginLeft: 18, //might actually need this!
    // marginRight: 20,
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
  cityInput: {
    fontFamily: "Roboto_400Regular",
    color: "rgba(59, 86, 124, 1)",
    fontSize: 15,
    height: 55,
    width: 150,
    marginLeft: 31,
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
  createAccountBtnTxt: {
    color: "white",
    fontFamily: "Roboto_400Regular",
    fontSize: 20,
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  subTxt: {
    color: "white",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    textDecorationLine: "underline",
    textDecorationColor: "white",
    marginRight: 7,
  },
});

export default CreateAccountScreen;
