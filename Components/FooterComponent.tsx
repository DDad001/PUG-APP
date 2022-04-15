import { FC, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Platform, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import man from '../assets/man.jpg';
import { Ionicons } from '@expo/vector-icons';
import PUGbutton from "./PUGButton";
const FooterComponent:FC = () => {
    return (
        <View style={styles.footerContainer}>
           <MaterialIcons name="home" size={35} color="white" style={{}}/>
           <Entypo name="chat" size={35} color="white" />
            <PUGbutton/>
           <Ionicons name="add" size={35} color="white" />
            <View>
         <Image source={man} style={{height: 35, width:35, borderRadius: 50, borderWidth:2, borderColor:'white'}}/>
        </View>  
        </View>
    )
}

const styles = StyleSheet.create({

    footerContainer:{
        backgroundColor:'#0A326D', 
        paddingBottom:20,
        paddingTop:15,
        flexDirection: 'row',
        justifyContent:'space-evenly'
    },

});

export default FooterComponent;