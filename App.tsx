import React, {FC, useState, Suspense} from "react";
import * as eva from "@eva-design/eva";
import {ApplicationProvider} from "@ui-kitten/components";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";
import {default as theme} from "./src/theme.json";
import Toast from "react-native-toast-message";
import FullPageLoader from "components/FullPageLoader/index.component";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "redux/store";
import {Provider} from "react-redux";
import {toastConfig} from "components/PLToast/index.component";
import {Platform} from "react-native";

const App: FC = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  //--> reactotron debugger setup
  if (__DEV__) {
    import("config/ReactotronConfig").then(() =>
      console.log("Reactotron Configured"),
    );
  }

  //load fonts
  //--> the roboto fonts below are referencing some HK fonts
  const fetchFonts = () => {
    return Font.loadAsync({
      "Roboto-Black": require("./src/assets/fonts/Roboto-Black.ttf"),
      "Roboto-Bold": require("./src/assets/fonts/hk-grotesk.bold.otf"),
      "Roboto-Light": require("./src/assets/fonts/hk-grotesk.light.otf"),
      "Roboto-Medium": require("./src/assets/fonts/hk-grotesk.medium.otf"),
      "Roboto-MediumItalic": require("./src/assets/fonts/Roboto-MediumItalic.ttf"),
      "Roboto-Regular": require("./src/assets/fonts/hk-grotesk.medium.otf"),
      Roboto: require("./src/assets/fonts/Roboto-Regular.ttf"),
      "Roboto-Thin": require("./src/assets/fonts/Roboto-Thin.ttf"),
      //-->LATO FONTS
      "Lato-Black": require("./src/assets/fonts/Lato-Black.ttf"),
      "Lato-Bold": require("./src/assets/fonts/Lato-Bold.ttf"),
      "Lato-Light": require("./src/assets/fonts/Lato-Light.ttf"),
      "Lato-Regular": require("./src/assets/fonts/Lato-Regular.ttf"),
      "Lato-Thin": require("./src/assets/fonts/Lato-Thin.ttf"),

      //--> HK FONT
      "HK-Bold": require("./src/assets/fonts/hk-grotesk.bold.otf"),
      "HKL-Bold": require("./src/assets/fonts/hk-grotesk.bold-legacy.otf"),

      "HK-SemiBold": require("./src/assets/fonts/hk-grotesk.semibold.otf"),
      "HKL-SemiBold": require("./src/assets/fonts/hk-grotesk.semibold-legacy.otf"),

      "HK-Medium": require("./src/assets/fonts/hk-grotesk.medium-legacy.otf"),
      "HKL-Medium": require("./src/assets/fonts/hk-grotesk.medium.otf"),

      "HK-Regular": require("./src/assets/fonts/hk-grotesk.regular.otf"),
      "HKL-Regular": require("./src/assets/fonts/hk-grotesk.regular-legacy.otf"),

      "HK-Light": require("./src/assets/fonts/hk-grotesk.light.otf"),
      "HKL-Light": require("./src/assets/fonts/hk-grotesk.light-legacy.otf"),
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
      <Suspense fallback={<FullPageLoader message="LOADING" />}>
        <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
          <Provider store={store}>
            <PersistGate
              loading={<FullPageLoader message="LOADING" />}
              persistor={persistor}>
              <Navigation colorScheme={colorScheme} />
              <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
            </PersistGate>
          </Provider>
        </ApplicationProvider>
      </Suspense>
    );
  }
};

export default App;
