import React, { useContext } from "react";
import { SafeAreaView } from "react-native";
import { MainContext } from "../MainContext";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Colors from "../utils/Colors";

const Main = ({ navigation }) => {
  const { formToggle, setFormToggle } = useContext(MainContext);

  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary }}>
      {formToggle ? (
        <RegisterForm
          formToggle={formToggle}
          setFormToggle={setFormToggle}
          navigation={navigation}
        />
      ) : (
        <LoginForm
          formToggle={formToggle}
          setFormToggle={setFormToggle}
          navigation={navigation}
        />
      )}
    </SafeAreaView>
  );
};

export default Main;
