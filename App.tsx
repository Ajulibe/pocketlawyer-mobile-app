import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";
import { default as theme } from "./src/theme.json";
import Toast from "react-native-toast-message";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  //--> reactotron debugger setup
  if (__DEV__) {
    import("config/ReactotronConfig").then(() =>
      console.log("Reactotron Configured")
    );
  }

  //load fonts
  const fetchFonts = () => {
    return Font.loadAsync({
      "Roboto-Black": require("./src/assets/fonts/Roboto-Black.ttf"),
      "Roboto-Bold": require("./src/assets/fonts/Roboto-Bold.ttf"),
      "Roboto-Light": require("./src/assets/fonts/Roboto-Light.ttf"),
      "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
      "Roboto-MediumItalic": require("./src/assets/fonts/Roboto-MediumItalic.ttf"),
      "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
      Roboto: require("./src/assets/fonts/Roboto-Regular.ttf"),
      "Roboto-Thin": require("./src/assets/fonts/Roboto-Thin.ttf"),
    });
  };

  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </ApplicationProvider>
    );
  }
}
