import React, { FC, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Pressable } from "react-native";
import TennisRacket from "../assets/tennisRacket.png";


const PassedLikedEventsScreen: FC = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={TennisRacket} style={styles.overlay} >
      </ImageBackground>
    </View>
  );
};


const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    overlay:{
        flex: 1,
        width: "100%",
        height: "100%"
    },
});


export default PassedLikedEventsScreen;