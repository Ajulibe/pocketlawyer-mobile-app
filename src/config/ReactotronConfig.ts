import Reactotron, {
  asyncStorage,
  networking,
  trackGlobalErrors,
} from "reactotron-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {NativeModules} from "react-native";
import * as reactotronRedux from "reactotron-redux";

// grabs the ip address
const host = NativeModules.SourceCode.scriptURL.split("://")[1].split(":")[0];

let ReactotronInstance = Reactotron.configure({
  host,
  name: "Pocket lawyer App",
})
  .use(trackGlobalErrors({}))
  .use(asyncStorage({}))
  .use(networking())
  //@ts-ignore
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux.reactotronRedux()).setAsyncStorageHandler!(
  //  <- here i am!
  AsyncStorage,
).connect();

export default ReactotronInstance;
