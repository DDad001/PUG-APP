import { FC, useState } from "react";
import { View, StyleSheet, Text, TextInput, ImageBackground } from "react-native";
import PUGbutton from "../Components/PUGButton";
import CourtPicture from "../assets/Court.png";
import AppLoading from "expo-app-loading";
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
            <ImageBackground source={CourtPicture} resizeMode="cover" style={{ height: "100%", width: "100%"}}>
                <View style={styles.overlayContainer}>
                    <PUGbutton />
                        <View style={{flex: 0.18, marginLeft: 16, marginRight: 16}}>
                            <View style={{alignItems: "flex-start", padding: 0}}>
                                <Text style={styles.headingTxt}>Want to upload your first event?</Text>
                            </View>
                        </View>
                        <View style={{flex: 0.04, marginLeft: 16, marginRight: 16}}>
                            <Text style={styles.subheadingTxt}>Join the PUG family to create your account.</Text>
                        </View>

                        <TextInput style={[styles.input, {marginTop: 50}]} onChangeText={(text) => setNewFirstName(text)} value={newFirstName} placeholder="First name" keyboardType="default" placeholderTextColor={"rgba(59, 86, 124, 1)"} accessibilityLabel="Enter first name"/>
                        <TextInput style={styles.input} onChangeText={(text) => setNewLastName(text)} value={newLastName} placeholder="Last name" keyboardType="default" placeholderTextColor={"rgba(59, 86, 124, 1)"} accessibilityLabel="Enter last name"/>
                        <TextInput style={styles.input} onChangeText={(text) => setNewUsername(text)} value={newUsername} placeholder="Username" keyboardType="default" placeholderTextColor={"rgba(59, 86, 124, 1)"} accessibilityLabel="Enter username"/>
                        <TextInput style={styles.input} onChangeText={(text) => setNewPassword(text)} value={newPassword} placeholder="Password" keyboardType="default" placeholderTextColor={"rgba(59, 86, 124, 1)"} accessibilityLabel="Enter password"/>
                    {/* <Text>{firstName}</Text>
                    <Text>{lastName}</Text> */}
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: "100%",
        height: "100%",
    },
    overlayContainer:{
        flex: 1,
    },
    headingTxt:{
        color: "white",
        fontWeight: "600",
        // fontFamily: "Roboto", //Roboto is not a system font!!!
        fontSize: 24,
        marginTop: 30,

    },
    subheadingTxt:{
        fontSize: 16,
        paddingLeft: 15,
        color: "white",
    },
    input:{
        //Text styling for the input fields!
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

});

export default CreateAccountScreen;
