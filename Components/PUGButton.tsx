import { FC } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";

const PUGbutton: FC = () => {
  return (
    <>
      <View style={styles.BtnBox}>
        <Text style={{ color: 'white', fontWeight: "bold", }}>PUG</Text>
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
    padding: 5,
    borderWidth: 1,
    borderColor: "white",
  },
});

export default PUGbutton;
