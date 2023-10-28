import { StyleSheet } from "react-native";
import Colors from "./utils/Colors";
import NavScareen from "./navigation/navigator";
import { MainProvider } from "./MainContext";

const App = () => {
  return (
    <MainProvider>
      <NavScareen />
    </MainProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
  },
});

export default App;
