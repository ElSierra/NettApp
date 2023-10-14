import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  input: {
    width: width - 40,
    backgroundColor: "#EEEEEE",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: "#CCCCCC",
  },
});
