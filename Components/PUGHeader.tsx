import { FC } from "react";
import { View, StyleSheet, Text, Button, Pressable, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

//You can't style a button have to use a pressable!
const PUGHeader: FC = () => {
  return (
      <>
      <View style={styles.container}> 
          <Text style={{fontSize:20, color:'white', marginLeft:12, marginTop:10}}>Sport Events</Text>
          <View style={{flex:1, alignItems: 'flex-end', marginTop:7, marginRight:10}}>
              <MaterialIcons name="notifications" size={35} color="#E8F1FF" />
          </View>
          <View style={{backgroundColor:'#7E90AB',borderBottomLeftRadius:50, borderBottomEndRadius:5, borderTopLeftRadius:5, width:45, height: 46}}>
          <Ionicons name="add" size={45} color="white" style={{marginLeft:4}}/>
          </View>
      </View>
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 25,
    flex: 0.1 //was 0.09
  },
  BtnBox: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: 'rgba(10, 50, 109, 0.1)',
    paddingRight: 8,
    paddingTop: 8,
    paddingLeft: 8,
    paddingBottom: 8,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'white'
  },
});

export default PUGHeader;
