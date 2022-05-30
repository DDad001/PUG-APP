import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import AppLoading from 'expo-app-loading';

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
} from '@expo-google-fonts/lato';

import {
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
    OpenSans_300Light_Italic,
    OpenSans_400Regular_Italic,
    OpenSans_500Medium_Italic,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold_Italic,
    OpenSans_800ExtraBold_Italic,
} from '@expo-google-fonts/open-sans';

const LoadingLogoScreen: FC = () => {

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
        OpenSans_400Regular,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.6, justifyContent: "flex-end", alignItems: "center" }}>
                <Text style={[{ fontFamily: "Lato_400Regular", fontSize: 20, fontWeight: "bold", }, styles.Titletxt]}>PUG</Text>
            </View>

            <View style={{ flex: 0.1, alignItems: "center", paddingTop: 40 }}>
                <Text style={{ fontFamily: "Lato_400Regular", color: "white", fontSize: 18 }}>Pick up games</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0A326D",
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

export default LoadingLogoScreen;

