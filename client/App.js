import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { FormInput } from "./components/FormComponents";
import GlobalStyles from "./utils/GlobalStyles";
import Colors from "./utils/Colors";
import Logo from "./views/Logo";

export default function App() {
  return (
    <View style={[styles.container, GlobalStyles.AndroidSafeArea]}>
      <Logo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
