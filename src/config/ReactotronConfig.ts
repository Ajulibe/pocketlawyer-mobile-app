import Reactotron, { asyncStorage } from "reactotron-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

Reactotron.configure({
  name: "Pocket lawyer App",
}).useReactNative({
  asyncStorage: true,
}).setAsyncStorageHandler!(AsyncStorage).connect();
