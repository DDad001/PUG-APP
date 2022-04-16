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
           <MaterialIcons name="home" size={37} color="white" style={{marginTop:8,marginRight:10}}/>
           <Ionicons name="add" size={48} color="white"/>
            <PUGbutton/>
            <MaterialIcons name="notifications" size={35} color="white" style={{marginTop:8, marginRight:8}}/>
            <View>
         <Image source={man} style={{height: 35, width:35, borderRadius: 50, borderWidth:2, borderColor:'white', marginTop:8, marginRight:5}}/>
        </View>  
        </View>
    )
}

const styles = StyleSheet.create({

    footerContainer:{
        backgroundColor:'#0A326D', 
        paddingBottom:9,
        paddingTop:10,
        flexDirection: 'row',
        justifyContent:'space-evenly'
    },

});

export default FooterComponent;