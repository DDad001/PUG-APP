import { FC, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { Datepicker, Icon, Layout } from "@ui-kitten/components";

import PUGbutton from "../Components/PUGButton";
import CourtPicture from "../assets/Court.png";
import AppLoading from "expo-app-loading";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
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
import { Box, CheckIcon, FormControl, Select } from "native-base";
import { Entypo } from '@expo/vector-icons';

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
        <View
          style={{
            flex: 0.14,
            justifyContent: "flex-end",
          }}
        >
          <Ionicons
            name="chevron-back"
            size={35}
            color="white"
            style={{ marginTop: 7, marginLeft: 15, alignSelf: "flex-start" }}
          />
        </View>
        <View
          style={{
            flex: 0.1,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 5,
          }}
        >
          <Text style={styles.headingTxt}>
            Want to upload your first event?
          </Text>
        </View>
        <View style={{ flex: 0.08, alignItems: "center" }}>
          <Text style={styles.subheadingTxt}>
            Join the PUG family to create your account.
          </Text>
        </View>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
          <ScrollView style={[styles.overlayContainer, {}]}>
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
                  <View style={{marginTop:3,marginLeft:18,}}>
              <Box maxW="155" borderRadius={15} style={{backgroundColor:"white", shadowColor: "black",shadowOffset: { width: -2, height: 4 },shadowOpacity: 0.5,shadowRadius: 3,}}>
          <Select minWidth="150"minHeight="53" accessibilityLabel="Choose Service" placeholderTextColor={'#3B567C'} placeholder="Select State" _selectedItem={{
              bg: "black.300",
              endIcon: <CheckIcon size={5} color="#3B567C"
              />
            }} borderWidth="0" fontFamily={"Roboto_400Regular"} fontSize={15} color={'#3B567C'}>
            <Select.Item label="CA" value="ux" />
            <Select.Item label="AL" value="web" />
            <Select.Item label="PA" value="cross" />
            <Select.Item label="WD" value="ui" />
            <Select.Item label="NY" value="backend" />
          </Select>
          {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please make a selection!
        </FormControl.ErrorMessage> */}
        </Box>
              </View>
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
            <View
              style={{
                flex: 0.2,
                justifyContent: "center",
                marginTop: 25,
                flexDirection: "row",
              }}
            >
              <Text style={styles.subTxtNoUnderline}>
                Already have an account?
              </Text>
              <Pressable
                onPress={() => console.log("Send the user to Login Screen!")}
                accessibilityLabel="Go to login screen"
              >
                <Text style={styles.subTxt}>Login here!</Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  subTxtNoUnderline: {
    color: "white",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    textDecorationColor: "white",
    marginRight: 7,
  },
});

export default CreateAccountScreen;
