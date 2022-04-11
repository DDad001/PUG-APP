import React from 'react';
import { FlatList, Image, StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Picker } from 'react-native';
import { useState } from 'react';
import man from '../assets/man.jpg';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
// import SelectDropdown from 'react-native-select-dropdown'
// import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';

// interface IndexPath {
//     row: number;
//     section?: number;
//   }

const CardListComponent = () => {
    const [ input, setInput ] = useState("")
    // const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));

    console.log(input)
 return(
     <>
     <View style={{flexDirection:'row'}}>

        <View>
        <TextInput style={styles.input} onChangeText={(text) => setInput(text)}
      onSubmitEditing={() => {alert(`Your message is: ${input}`);
      setInput("");
    }}
    value ={input}
    placeholder="Search for an event..."
    placeholderTextColor={'#959494'}
    />
        </View>
        <TouchableHighlight >
        <View style={{backgroundColor:'#0A326D',width:54,height:45, marginTop:18, borderBottomRightRadius:7, borderTopRightRadius:7,}}>
        <FontAwesome name="search" size={15} color="white" style={{marginTop:14,marginLeft:17}}/>
        </View>
         </TouchableHighlight>
    </View>

    {/* <View>
    <Layout style={styles.container} level='1'>
      <Select
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <SelectItem title='Option 1'/>
        <SelectItem title='Option 2'/>
        <SelectItem title='Option 3'/>
      </Select>
    </Layout>
    </View> */}

     <View style={styles.card}>
    <View style={styles.cardContent}>
        <View style={{flexDirection:'row',}}>
              <Image source={man} style={{height: 90, width:120, borderRadius:8}}/>
            <View>
                <View style={{flexDirection:'row'}}>
                      <Text style={{marginLeft:20, fontSize:12, marginTop:10}}>Oak Park Basketball Game</Text>
                      <MaterialIcons name="location-on" size={18} color="white" style={{backgroundColor:'#0A326D', borderRadius:2, marginTop:10, marginLeft:12}} />
                      <FontAwesome5 name="heart" size={18} color="white" style={{backgroundColor:'#0A326D', borderRadius:2, marginTop:10, marginLeft:5}}/>
                </View>
            <View style={{flexDirection:'column',}}>
                <View style={{flexDirection:'row',}}>
                       <Text style={{fontSize:10, marginLeft:21, marginTop:8}}>4520 W Eight Mile Rd,{'\n'}Stockton, CA 95209</Text>
                      <MaterialCommunityIcons name="calendar-month" size={18} color="black" style={{marginTop:10, marginLeft:38}}/>
                      <Text style={{fontSize:10, marginTop:12, marginLeft:4}}>Today</Text>
                </View>

            <View style={{flexDirection:'row'}}>
            <Image source={man} style={{height: 22, width:22, borderRadius:10, marginTop:8, marginLeft:22}}/>
            <Text style={{marginLeft:10, marginTop:13, fontSize:10}}>Matthew David</Text>
            <MaterialCommunityIcons name="clock-time-three-outline" size={18} color="black" style={{marginLeft:41}}/>
            <Text style={{fontSize:10, marginTop:3, marginLeft:4}}>9:30 am</Text>
            </View>

            </View>
            </View>
        </View>
      

    </View>
</View>
    </>
)
};

const styles = StyleSheet.create({
    container: {
        minHeight: 128,
      },
    card:{
        borderRadius: 8,
        elevation: 3,
        backgroundColor:'#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity:0.3,
        shadowRadius:2,
        marginHorizontal: 8,
        marginVertical: 20
    },
    cardContent:{
       marginHorizontal: 8,
       marginVertical: 8,
    },
    input:{
        marginLeft:10,
        marginTop:18,
        width:300,
        height:45,
        backgroundColor:'white',
        borderColor: "white",
        borderWidth: 1,
        borderTopStartRadius: 7,
        borderBottomStartRadius:7,
        padding: 10
      }

});

export default CardListComponent;