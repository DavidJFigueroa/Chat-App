import {useEffect, useState} from "react";
import {StyleSheet, View, KeyboardAvoidingView} from "react-native";
import {GiftedChat, Bubble} from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const Chat = ({route, navigation, db}) => {
  const {name, color, userID} = route.params;
  const [containerColor, setContainerColor] = useState(color);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title: name,
      // headerStyle: {
      //   backgroundColor: color, // Set the header background color
      // },
    });
    setContainerColor(color);

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      setMessages(newMessages);
    });
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

  const onSend = async (newMessages) => {
    const message = newMessages[0]; // Get the first message in the array
    try {
      await addDoc(collection(db, "messages", newMessages[0]), {
        _id: message.id,
        text: message.text,
        createdAt: message.createdAt,
        user: {
          _id: message.user._id,
          name: message.user.name,
        },
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: containerColor}]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
