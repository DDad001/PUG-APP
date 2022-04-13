import { FC } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";

//You can't style a button have to use a pressable!
const PUGbutton: FC = () => {
  return (
    <>
      <View>  
            <Text style={styles.BtnBox}>PUG</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  BtnBox: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "rgba(10, 50, 109, 0.1)",
    paddingRight: 7,
    paddingTop: 7,
    paddingLeft: 7,
    paddingBottom: 7,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "white",
  },
});

export default PUGbutton;
