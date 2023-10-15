import { View, Text, Pressable, TouchableOpacity } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { getLocalData } from "../../helpers/local.data.handler";
import { Outlet } from "../../types/outlets";
import { useEffect, useState } from "react";
import { COLORS } from "../../common/colors";
import { useTheme } from "../../context/theme/ThemeContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useModal } from "../../context/modal/ModalContext";

export default function AddNewVisit() {
  const [outletNames, setOutletNames] = useState<string[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [activationDate, setActivationDate] = useState(new Date());
  const { isDarkMode } = useTheme();
  const { closeModal } = useModal();

  useEffect(() => {
    async function getOutlets() {
      const localData = await getLocalData("UserOutlets");
      let outlets: string[] = [];
      localData.map((data: Outlet) => outlets.push(data.name));
      setOutletNames(outlets);
    }

    getOutlets();
  }, []);

  function onDateChange(e: any, selectedDate: any) {
    // if (e.type === "set") {
    //   const currentDate = selectedDate;
    //   setDate(currentDate);
    //   if (Platform.OS === "android") {
    //     setShowDatePicker(!showDatePicker);
    //     setActivationDate(currentDate.toDateString);
    //   }
    // } else {
    //   setShowDatePicker(!showDatePicker);
    // }
  }

  return (
    <View>
      <Text className="text-darkNeutral dark:text-lightText">
        <Text className="text-[20px] text-secondary text-center font-semibold">
          Add New Visit
        </Text>
      </Text>

      <View>
        <View>
          <View className="flex-row justify-start items-center gap-1 mt-5 mb-2">
            <Text className="text-[17px] text-darkNeutral dark:text-lightText">
              Select Outlet
            </Text>
            <Text className="text-red-600 text-base">*</Text>
          </View>
          <SelectDropdown
            data={outletNames}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={{
              backgroundColor: "transparent",
              borderWidth: 0.8,
              borderColor: "#CCCCCC",
              height: 45,
              width: "100%",
              borderRadius: 8,
            }}
            buttonTextStyle={{
              fontSize: 15,
              textAlign: "left",
              color: isDarkMode ? COLORS.authDark : "#222",
            }}
            dropdownStyle={{
              borderRadius: 10,
            }}
            rowTextStyle={{
              fontSize: 14,
              textAlign: "left",
              color: COLORS.dark,
            }}
          />
        </View>

        <View className="flex-row justify-start items-center gap-1 mt-6 mb-2">
          <Text className="text-[17px] text-darkNeutral dark:text-lightText">
            Select Date
          </Text>
          <Text className="text-red-600 text-base">*</Text>
        </View>

        <Pressable onPress={() => setShowDatePicker(!showDatePicker)}>
          <View className="border border-[#CCCCCC] dark:border-authDark rounded-lg  p-4 text-base mt-2">
            <Text className="text-base text-authDark">Select Date</Text>
          </View>
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onDateChange}
            style={{
              backgroundColor: isDarkMode ? "#fff" : "auto",
            }}
          />
        )}

        <View className="flex-row justify-end items-end gap-3 mt-3">
          <TouchableOpacity onPress={closeModal}>
            <Text className="font-medium text-red-600 text-[17px]">CANCEL</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text className="font-medium text-secondary text-[17px]">SAVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
