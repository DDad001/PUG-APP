import { FC } from "react";
import { View, StyleSheet, Text, Button, Pressable } from "react-native";

//You can't style a button have to use a pressable!
const PUGbutton: FC = () => {
  return (
      <>
      <View style={styles.container}>
          <Pressable onPress={() => console.log("Take Me Home!!!!")}>
          <Text style={styles.BtnBox}>PUG</Text>
          </Pressable>
      </View>
      {/* <View style={styles.container2}></View> */}
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor:"rgba(10, 50, 109, 0.2)", //#0A326D || orange
    paddingTop: 30,
    flex: 0.09
  },
  container2:{
    backgroundColor:"orange",
    flex: 0.8
  },
  BtnBox: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    backgroundColor: "#0A326D",
    paddingRight: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "white"
  }
});

export default PUGbutton;
