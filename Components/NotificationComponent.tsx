import { FC } from "react";
import { Text, ScrollView, StyleSheet, Image } from "react-native";

const NotificationComponent: FC = () => {
  return (
    <ScrollView style={styles.ScrollStyle}>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ImageStyle: {
    height: 70,
    width: 70,
    borderRadius: 50,
    marginRight: 20,
  },
  ScrollStyle: {
    paddingTop: 10,
    paddingBottom: 5,
  },
  TextStyle: {
    color: 'white',
  },
});

export default NotificationComponent;
