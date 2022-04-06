import { FC, useState } from "react";
import { View, StyleSheet, Text, TextInput, ImageBackground } from "react-native";
import PUGbutton from "../Components/PUGButton";
import GuyOnBasketballCourt from "../assets/GuyOnBasketBallCourt.png";

const CreateAccountScreen: FC = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");

    return (
        <View style={styles.container}>
            <ImageBackground source={GuyOnBasketballCourt} resizeMode="cover" style={{ height: 700, width: 375, zIndex: 3, backgroundColor: "#0A326D" }}>
                <View style={styles.overlayContainer}>
                    <PUGbutton />
                        <Text style={styles.headingTxt}>Want to upload your first event?</Text>
                        <Text style={styles.subheadingTxt}>Join the PUG family to create your account.</Text>
                    <TextInput style={styles.input} onChangeText={(text) => setFirstName(text)} value={firstName} placeholder="First name" keyboardType="default" placeholderTextColor={"rgba(59, 86, 124, 1)"}/>
                    <TextInput style={styles.input} onChangeText={(text) => setLastName(text)} value={lastName} placeholder="Last name" keyboardType="default" placeholderTextColor={"rgba(59, 86, 124, 1)"}/>

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
        backgroundColor: "rgba(10, 50, 109, 0.6)"
    },
    headingTxt:{
        color: "white",
        fontWeight: "600",
        // fontFamily: "Roboto", //Roboto is not a system font!!!
        fontSize: 24,
        marginTop: 30,
        alignSelf: "center" //bad practice probably

    },
    subheadingTxt:{
        fontSize: 16,
        color: "white",
        alignSelf: "center" //bad practice probably...
    },
    input:{
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: "rgba(59, 86, 124, 1)",
        borderColor: "white",
        backgroundColor: "white",
        borderRadius: 20
    }

});

export default CreateAccountScreen;
