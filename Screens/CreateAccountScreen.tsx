import { FC } from "react";
import { View, StyleSheet, Text, TextInput, ImageBackground } from "react-native";
import PUGbutton from "../Components/PUGButton";
import GuyOnBasketballCourt from "../assets/GuyOnBasketBallCourt.png";

const CreateAccountScreen: FC = () => {
    return (
        <View style={styles.container}>
            <ImageBackground source={GuyOnBasketballCourt} resizeMode="cover" style={{ height: 700, width: 375, zIndex: 3, backgroundColor: "#0A326D" }}>
                <View style={styles.overlayContainer}>
                    <PUGbutton />
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
        backgroundColor: "rgba(10, 50, 109, 0.6)"
    }

});

export default CreateAccountScreen;
