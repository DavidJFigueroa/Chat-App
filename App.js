import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import {initializeApp} from "firebase/app";
import {getFirestore, disableNetwork, enableNetwork} from "firebase/firestore";

import Start from "./components/Start";
import Chat from "./components/Chat";
import {useNetInfo} from "@react-native-community/netinfo";
import {useEffect} from "react";

import {Alert, LogBox} from "react-native";
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  const connectionStatus = useNetInfo();

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

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
