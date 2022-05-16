import { Pressable, View } from "react-native"
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { FC, useContext, useState, useEffect } from "react";
import {AddLikedEvent, DeleteLikedEvent, GetIsLiked, triggerNotificationHandler} from '../Services/DataService'
import UserContext from "../Context/UserContext";
import { createOpenLink } from "react-native-open-maps";

const EventDisplayedImageComponent:FC = () => {

    const { eventItems } = useContext<any>(UserContext);

    return (
       <View style={{flexDirection: "row", paddingTop: 5,}}> 
            <View style={{flex:1, alignItems: 'flex-end', marginTop:7, marginRight:10}}>
              <Pressable onPress={createOpenLink({ provider: 'google', end: eventItems.addressOfEvent})}>
                  <MaterialIcons name="location-on" size={20} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', marginTop: 10, marginLeft: 12, padding:5  }} />
              </Pressable>
            </View>
        </View>
    )
}

export default EventDisplayedImageComponent;