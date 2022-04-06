import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

const UploadFirstEventScreen: FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.Titletxt}>PUG</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0A326D",
        justifyContent: "center",
        alignItems: "center"
    },
    Titletxt: {
        // fontFamily: "Lato" ,
        fontSize: 64,
        fontWeight: "bold",
        color: "white",
        borderWidth: 5,
        borderColor: "white",
        paddingTop: 50,
        paddingBottom: 50,
        paddingLeft: 50,
        paddingRight: 50
      
    }
});

export default UploadFirstEventScreen;