import { FC, useState } from "react";
import { View, StyleSheet, Text, TextInput, ImageBackground } from "react-native";
import PUGbutton from "../Components/PUGButton";
import GuyOnBasketballCourt from "../assets/GuyOnBasketBallCourt.png";

const CreateAccountScreen: FC = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");

    return (
        <View style={styles.container}>
            <ImageBackground source={GuyOnBasketballCourt} resizeMode="cover" style={{ height: "100%", width: "100%", backgroundColor: "#0A326D" }}>
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
        backgroundColor: "orange"
    },
    overlayContainer:{
        flex: 1,
        // backgroundColor: "rgba(10, 50, 109, 0.6)"
    },
    headingTxt:{
        color: "white",
        fontWeight: "600",
        // fontFamily: "Roboto", //Roboto is not a system font!!!
        fontSize: 24,
        marginTop: 30,
        // alignSelf: "center" 

    },
    subheadingTxt:{
        fontSize: 16,
        paddingLeft: 15,
        color: "white",
    },
    input:{
        //Text styling for the input fields!
        height: 60,
        marginTop: 10,
        marginLeft: 18,
        marginRight: 20,
        marginBottom: 20,
        borderWidth: 1,
        padding: 10,
        borderColor: "white",
        backgroundColor: "white",
        borderRadius: 20
    },

});

export default CreateAccountScreen;
