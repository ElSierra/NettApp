import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { useAlert } from "../../context/alert/AlertContext";
import { useAuth } from "../../context/auth/AuthContext";
import { styles } from "./styles";
import { useTheme } from "../../context/theme/ThemeContext";
import { useModal } from "../../context/modal/ModalContext";
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { Divider } from "react-native-paper";

export default function Modal() {
  const { width } = Dimensions.get("window");
  const { isDarkMode } = useTheme();
  const { state, removeActiveUser } = useAuth();
  const {
    showModal,
    closeModal,
    title,
    message,
    actionBtnText,
    action,
    param,
    setParam,
  } = useModal();
  const { showAlertAndContent } = useAlert();
  const { setCurrRoute, currrRoute } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  function handleModalAction() {
    switch (action) {
      case "LogOut":
        logOutUser();
        break;
      case "SyncData":
        syncData();
        break;
      case "BecomeAuthor":
        break;
      case "DeleteNotif":
        break;
      case "ClearNotifs":
        break;
      default:
        return null;
    }
  }

  function logOutUser() {
    removeActiveUser();
    closeModal();

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  }

  function syncData() {
    showAlertAndContent({
      type: "success",
      message: "Your Data has been Synced Successfully!",
    });
    setCurrRoute("Home");
    closeModal();
  }

  console.log({ param });

  return (
    <>
      {showModal && param === undefined ? (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={
              loading
                ? () => {}
                : () => {
                    setParam(undefined);
                    closeModal();
                  }
            }
          />
          <View style={[styles.alertBox, { minWidth: width - 50 }]}>
            <View className="bg-secondary p-6 rounded-tl-[14px] rounded-tr-[14px]">
              <Text className="text-lightText text-center text-[19px] font-bold">
                {title}
              </Text>
              <Text className="text-lightText text-center text-[15px] font-semibold mt-2">
                {message}
              </Text>
            </View>
            <View className="bg-white p-4 rounded-bl-[14px] rounded-br-[14px]">
              <TouchableOpacity onPress={handleModalAction}>
                <Text className="text-secondary text-center font-bold mb-3 text-base">
                  Yes
                </Text>
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity
                onPress={() => {
                  closeModal();
                  currrRoute === "Sync" && setCurrRoute("Home");
                }}
              >
                <Text className="text-red-600 text-center font-bold mt-3 text-base">
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
    </>
  );
}
