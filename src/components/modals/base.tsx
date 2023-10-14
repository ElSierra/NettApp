import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import { useAlert } from "../../context/alert/AlertContext";
import { useAuth } from "../../context/auth/AuthContext";
import { styles } from "./styles";
import { useTheme } from "../../context/theme/ThemeContext";
import { useModal } from "../../context/modal/ModalContext";

export default function Test() {
  const { width } = Dimensions.get("window");
  const { isDarkMode } = useTheme();
  const {
    state: { user },
    setActiveUser,
  } = useAuth();
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
  const [loading, setLoading] = useState(false);

  function handleModalAction() {
    switch (action) {
      case "Deactivate":
        break;
      case "Reactivate":
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

  return (
    <>
      {showModal ? (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={
              loading
                ? () => {}
                : () => {
                    setParam(undefined);
                    closeModal;
                  }
            }
          />
          <View
            style={[styles.alertBox, { maxWidth: width - 50 }]}
            className="bg-white dark:bg-darkNeutral"
          >
            <Text
              style={[styles.title]}
              className="text-darkNeutral dark:text-lightText"
            >
              {title}
            </Text>
            <Text className="text-grayText dark:text-lightGray text-base font-normal mb-4 text-center leading-6">
              {message}
            </Text>

            <View className="flex-row justify-center items-center pt-3">
              <TouchableOpacity
                onPress={loading ? () => {} : closeModal}
                className="border border-1 border-lightGray mr-3 rounded-md bg-grayNeutral"
              >
                <Text
                  className="py-2 px-10 text-center text-base font-semibold dark:font-bold"
                  style={{
                    color: isDarkMode ? "#4E0F12" : "#74171C",
                  }}
                >
                  CLOSE
                </Text>
              </TouchableOpacity>

              {loading ? (
                <View className="border border-1 border-primaryColor bg-primaryColor  dark:border-primaryColorTheme dark:bg-primaryColorTheme mr-3 rounded-md">
                  <View className="py-2 px-14 justify-center items-center text-center text-base font-semibold  dark:font-bold">
                    <ActivityIndicator size="small" color={"#fff"} />
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleModalAction}
                  className="border border-1 border-primaryColor bg-primaryColor dark:bg-primaryColorTheme dark:border-primaryColorTheme mr-3 rounded-md"
                >
                  <Text
                    style={{ color: "#FFF" }}
                    className="py-2 px-10 text-center text-base font-semibold dark:font-bold"
                  >
                    {actionBtnText}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      ) : null}
    </>
  );
}
