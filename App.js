import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Start from "./components/Start";
import Chat from "./components/Chat";

const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCSDZiAhr8monfzsaMiwNk8zHozMgA7Mt8",
    authDomain: "chat-app-a9741.firebaseapp.com",
    projectId: "chat-app-a9741",
    storageBucket: "chat-app-a9741.appspot.com",
    messagingSenderId: "1077565715115",
    appId: "1:1077565715115:web:6e8dccdc34804a04c77dee",
    measurementId: "G-SRZL1J6NVW",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
