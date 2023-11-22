import Toast from "react-native-toast-message";

// export const baseUrl = "http://192.168.100.190:3000";
export const baseUrl = "http://192.168.38.159:3000";

export const showToast = (type, text1, text2) => {
  Toast.show({
    type: type, // 'success', 'error', 'info', 'warn'
    position: "bottom",
    text1: text1,
    text2: text2,
    visibilityTime: 3000, // 3 seconds
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
};
