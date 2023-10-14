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
import AddNewVisit from "../add_visit/AddNewVisit";

export default function ReusableModal() {
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
  console.log({ title });

  return (
    <>
      {showModal && param ? (
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
            {title === "Add Visit" && <AddNewVisit />}

            <View className="flex-row justify-center items-center pt-3">
              <TouchableOpacity
                onPress={loading ? () => {} : closeModal}
                className="border border-1 border-lightGray mr-3 rounded-md bg-grayNeutral"
              >
                <Text className="py-2 px-10 text-center text-base font-semibold dark:font-bold text-rose-500">
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
