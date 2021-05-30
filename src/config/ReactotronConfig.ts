import Reactotron, { asyncStorage } from "reactotron-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeModules } from "react-native";

// grabs the ip address
const host = NativeModules.SourceCode.scriptURL.split("://")[1].split(":")[0];

Reactotron.configure({
  host,
  name: "Pocket lawyer App",
}).useReactNative({
  asyncStorage: true,
}).setAsyncStorageHandler!(AsyncStorage).connect();
