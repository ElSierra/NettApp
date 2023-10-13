import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  title: {
    fontFamily: "OSRSemiB",
    color: "#FFF",
    fontWeight: "700",
    fontSize: 30,
  },
  subTitle: {
    marginLeft: 19,
    fontSize: 16,
    textAlign: "center",
    maxWidth: "90%",
    color: "#FFF",
    lineHeight: 23,
    fontWeight: "500",
  },
  lottieWrapper: {
    width: width * 0.9,
    height: 290,
  },
});
