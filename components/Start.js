import {useState} from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import {getAuth, signInAnonymously} from "firebase/auth";
import SearchIcon from "../assets/icon.svg";

const Start = ({navigation}) => {
  const auth = getAuth();
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [isPressed, setIsPressed] = useState({
    border1: false,
    border2: false,
    border3: false,
    border3: false,
  });

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          userID: result.user.uid,
          name: name,
          color: color,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };

  const changeColor = (color) => {
    setColor(color);
    setIsPressed({
      color1: color === "#090C08",
      color2: color === "#474056",
      color3: color === "#8A95A5",
      color4: color === "#B9C6AE",
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background-image.png")}
        resizeMode="cover"
        style={styles.image}>
        <Text style={styles.title}>Chat App</Text>
        <View></View>
        <View style={styles.chatContainer}>
          <View style={styles.searchContainer}>
            <SearchIcon style={styles.searchIcon} width={30} height={30} />
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Your Name"
            />
          </View>

          <Text style={{color: "#757083"}}>Choose Background Color:</Text>
          <View style={styles.colorButtonContainer}>
            <TouchableOpacity
              style={[
                {backgroundColor: "#090C08"},
                isPressed.color1 ? styles.isPressed : styles.colorButton,
              ]}
              accessible={true}
              accessibilityLabel="Choose color"
              accessibilityHint="Lets you choose background color of the chat screen."
              accessibilityRole="button"
              onPress={() => {
                changeColor("#090C08");
              }}></TouchableOpacity>
            <TouchableOpacity
              style={[
                {backgroundColor: "#474056"},
                isPressed.color2 ? styles.isPressed : styles.colorButton,
              ]}
              accessible={true}
              accessibilityLabel="Choose color"
              accessibilityHint="Lets you choose background color of the chat screen."
              accessibilityRole="button"
              onPress={() => changeColor("#474056")}></TouchableOpacity>
            <TouchableOpacity
              style={[
                {backgroundColor: "#8A95A5"},
                isPressed.color3 ? styles.isPressed : styles.colorButton,
              ]}
              accessible={true}
              accessibilityLabel="Choose color"
              accessibilityHint="Lets you choose background color of the chat screen."
              accessibilityRole="button"
              onPress={() => changeColor("#8A95A5")}></TouchableOpacity>
            <TouchableOpacity
              style={[
                {backgroundColor: "#B9C6AE"},
                isPressed.color4 ? styles.isPressed : styles.colorButton,
              ]}
              accessible={true}
              accessibilityLabel="Choose color"
              accessibilityHint="Lets you choose background color of the chat screen."
              accessibilityRole="button"
              onPress={() => changeColor("#B9C6AE")}></TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={signInUser}
            accessible={true}
            accessibilityLabel="Start Chatting"
            accessibilityHint="Lets you go to the chat screen."
            accessibilityRole="button">
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
        {Platform.OS === "ios" ? (
          <KeyboardAvoidingView behavior="padding" />
        ) : null}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 50,
  },
  chatContainer: {
    backgroundColor: "white",
    width: "88%",
    // height: "44%",
    minHeight: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  searchIcon: {
    position: "absolute",
    left: 10,
    padding: 10,
  },
  textInput: {
    width: "88%",
    padding: 15,
    paddingLeft: 50,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
  },
  colorButtonContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
    marginBottom: 50,
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  isPressed: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: "#fca7f4",
    borderWidth: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#757083",
    padding: 10,
    width: "88%",
    height: 50,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default Start;
