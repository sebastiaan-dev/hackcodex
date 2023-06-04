import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Data } from "./pages/data";
import { Assistant } from "./pages/assistant";
import { Info } from "./pages/info";

const Stack = createNativeStackNavigator();

export default function App() {
  useFonts({
    Figtree: require("./assets/fonts/Figtree.ttf"),
    "Figtree-Italic": require("./assets/fonts/Figtree-Italic.ttf"),
  });

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator
          initialRouteName="Assistant"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Assistant" component={Assistant} />
          <Stack.Screen name="Data" component={Data} />
          <Stack.Screen name="Info" component={Info} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
