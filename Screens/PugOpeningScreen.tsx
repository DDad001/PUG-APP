import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

const PugOpeningScreen: FC = () => {
    return (
        <View style={{ backgroundColor: "#0A326D"}}>
            <Text>Hello I am the Pug Opening Screen</Text>
            <Text>Hello I am the Pug Opening Screen</Text>
            <Text>Hello I am the Pug Opening Screen</Text>
            <Text>Hello I am the Pug Opening Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    blueContainer: {
        backgroundColor: "#0A326D",
        flex: 1
    },
});

export default PugOpeningScreen;