import {useEffect, useState} from "react";
import {StyleSheet, View, Text} from "react-native";

const Chat = ({route, navigation}) => {
  const {name, color} = route.params;
  const [containerColor, setContainerColor] = useState(color);

  useEffect(() => {
    navigation.setOptions({
      title: name,
      // headerStyle: {
      //   backgroundColor: color, // Set the header background color
      // },
    });
    setContainerColor(color);
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: containerColor}]}>
      <Text>Hello Chat!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Chat;
