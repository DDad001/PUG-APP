import { Pressable, View } from "react-native"
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { FC, useContext, useState, useEffect } from "react";
import {AddLikedEvent, DeleteLikedEvent, GetIsLiked} from '../Services/DataService'
import UserContext from "../Context/UserContext";

const EventDisplayedImageComponent:FC = () => {

    const { userItems, eventItems, nameContext } = useContext<any>(UserContext);

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
      checkIfLiked();
    })

    const handleLiked = () => {
        setIsLiked(!isLiked)
        let liked = isLiked;
        if (!liked) {
          let addLike = {
            Id: 0,
            UserId: userItems.id,
            EventId: eventItems.id,
            EventUnliked: false
          }
          AddLikedEvent(addLike)
        } else {
          DeleteLikedEvent(userItems.id, eventItems.id)
        }
    
      }

      const checkIfLiked = async () => {
        let liked = await GetIsLiked(userItems.id, eventItems.id);
        
        setIsLiked(liked);
        //console.log(liked);
      }
    return (
       <View style={{flexDirection: "row", paddingTop: 5,}}> 
            <View style={{flex:1, alignItems: 'flex-end', marginTop:7, marginRight:10}}>
            <MaterialIcons name="location-on" size={20} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', marginTop: 10, marginLeft: 12, padding:5  }} />
            </View>
            <View style={{marginTop:7, marginRight:10}}>
              <Pressable onPress={handleLiked} >
                {
                  isLiked ? <FontAwesome name="heart" size={17} color="red" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', marginTop: 10, padding:6.5 }} />
                  : <FontAwesome name="heart-o" size={17} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', marginTop: 10, padding:6.5 }} />
                }      
            </Pressable>
            </View>
        </View>
    )
}

export default EventDisplayedImageComponent;