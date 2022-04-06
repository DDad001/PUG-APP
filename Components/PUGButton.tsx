import { FC } from "react";
import {View, StyleSheet, Text, Button } from "react-native";

const PUGbutton: FC = () => {
    return(
        <View>
            <Text>Hello I am the PUG Button Component!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    ContainerEx:{
        backgroundColor:"black",
        flex: 0.5
    },
    ButtonStyling:{
        
    }
});


export default PUGbutton;