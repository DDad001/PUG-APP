import { FC } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import SoccerField from '../assets/SoccerField.png';
import man from '../assets/man.jpg';
import { MaterialIcons } from '@expo/vector-icons';

const ProfileScreen: FC = () => {
 return (

    <View style={styles.mainContainer}>
         <ImageBackground source={SoccerField} resizeMode="cover" style={{ height: "100%", width: "100%", backgroundColor: "#0A326D" }}>
             <View style={{flexDirection:'row', justifyContent:'center'}}>
                <View style={{backgroundColor:'white', height:35,width:110, marginTop:50, borderTopLeftRadius:10, borderBottomLeftRadius:10,}}>
                    <Text style={{marginLeft:20, marginTop:10,}}>My Profile</Text>
                </View>
                <View style={{backgroundColor:'white', height:35,width:110, marginTop:50}}>
                    <Text style={{marginLeft:12, marginTop:10}}>Past events</Text>
                </View>
                <View style={{backgroundColor:'white', height:35,width:110, marginTop:50,borderTopRightRadius:10, borderBottomRightRadius:10}}>
                    <Text style={{marginLeft:10, marginTop:10}}>Liked events</Text>
                </View>
             </View>
          <View style={{alignItems:'center'}}>
                <Image source={man} style={{ height: 100, width: 100, borderRadius: 50, marginTop: 25}} />
          </View>
          <View style={{justifyContent:'center', flexDirection:'row'}}>
                <Text style={{marginTop: 20, color:'white', marginLeft:2}}>Jack Smith,</Text>
                <Text style={{marginTop: 20, color:'white'}}>26</Text>
          </View>

          <View style={{justifyContent:'center', flexDirection:'row'}}>
          <MaterialIcons name="location-on" size={19} color="white" style={{ marginTop: 17,marginRight:2}} />
                <Text style={{marginTop: 20, color:'white'}}>Stockton, CA</Text>
          </View>

          <View style={{justifyContent:'center', flexDirection:'row'}}>
                <Text style={{marginTop: 20, color:'white',marginRight:35}}>26</Text>
                <Text style={{marginTop: 20, color:'white', marginLeft:35}}>38</Text>
          </View>

          <View style={{justifyContent:'center', flexDirection:'row'}}>
                <Text style={{marginTop: 10, color:'white',marginRight:15}}>Followers</Text>
                <Text style={{marginTop: 10, color:'white', marginLeft:15}}>Following</Text>
          </View>
          <View>
              <Text style={{marginTop: 30, color:'white',marginLeft:25, fontSize:25}}>Active Events</Text>
          </View>

          <View>
          <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={{ flexDirection: 'row', }}>
            <Image source={man} style={{ height: 90, width: 120, borderRadius: 8 }} />
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginLeft: 20, fontSize: 12, marginTop: 10 }}>Oak Park Basketball Game</Text>
                <MaterialIcons name="location-on" size={18} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 2, marginTop: 10, marginLeft: 12 }} />
               
              </View>
              <View style={{ flexDirection: 'column', }}>
                <View style={{ flexDirection: 'row', }}>
                  <Text style={{ fontSize: 10, marginLeft: 21, marginTop: 8 }}>4520 W Eight Mile Rd,{'\n'}Stockton, CA 95209</Text>
                 
                  <Text style={{ fontSize: 10, marginTop: 12, marginLeft: 4 }}>Today</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Image source={man} style={{ height: 22, width: 22, borderRadius: 10, marginTop: 8, marginLeft: 22 }} />
                  <Text style={{ marginLeft: 10, marginTop: 13, fontSize: 10 }}>Matthew David</Text>
                  
                  <Text style={{ fontSize: 10, marginTop: 3, marginLeft: 4 }}>9:30 am</Text>
                </View>

              </View>
            </View>
          </View>


        </View>
      </View>
          </View>
          </ImageBackground>

    </View>
 )   
}

const styles = StyleSheet.create({
    mainContainer:{
    paddingTop: 20,
    flex: 1 
    },
    card: {
        borderRadius: 8,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 8,
        marginVertical: 20,
      },
      cardContent: {
        marginHorizontal: 8,
        marginVertical: 8,
      },
})
export default ProfileScreen;