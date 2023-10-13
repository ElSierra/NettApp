import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import { ChangeEvent, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { CompetitonReview } from "../../types/general";
import Header from "../../components/header/Header";
import { COLORS } from "../../common/colors";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "../../context/theme/ThemeContext";

export default function CompetitionReview() {
  const [checked, setChecked] = useState<boolean>(false);
  const [date, setDate] = useState(new Date());
  const [activationDate, setActivationDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { isDarkMode } = useTheme();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CompetitonReview>();

  function onSubmit(data: CompetitonReview) {
    console.log(data);
  }

  function onDateChange(e: any, selectedDate: any) {
    if (e.type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        setShowDatePicker(!showDatePicker);
        setActivationDate(currentDate.toDateString);
      }
    } else {
      setShowDatePicker(!showDatePicker);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-darkTheme">
      <Header />

      <ScrollView showsVerticalScrollIndicator={false} className="mx-3">
        <View className="border border-gray-300 dark:border-authDark p-4 rounded-lg">
          <View className="border-b-4 border-b-[#D9D9D9] dark:border-authDark relative mb-3">
            <Text className="text-2xl text-secondary dark:text-secondaryLight text-center font-bold mb-1">
              Competition Review
            </Text>
            <View className="absolute bg-secondary border-2 w-48 border-secondary dark:border-secondaryLight top-8 left-[68px]" />
          </View>

          <View>
            <Text className="text-red-600 text-right text-sm">
              *
              <Text className="text-darkNeutral dark:text-lightText">
                Mandatory fields
              </Text>
            </Text>
          </View>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <View className="flex-row justify-start items-center gap-1 mt-5 mb-2">
                  <Text className="text-[17px] text-darkNeutral dark:text-lightText">
                    What brand is activated?
                  </Text>
                  <Text className="text-red-600 text-base">*</Text>
                </View>
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className="border border-[#CCCCCC] dark:border-authDark h-11 rounded-lg text-darkNeutral dark:text-lightText pl-3 text-base"
                />
              </View>
            )}
            name="brand"
          />
          {errors.brand && (
            <Text className="text-red-600 mt-1">This field is required.</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <View className="flex-row justify-start items-center gap-1 mt-5 mb-2">
                  <Text className="text-[17px] text-darkNeutral dark:text-lightText">
                    What is the activation?
                  </Text>
                  <Text className="text-red-600 text-base">*</Text>
                </View>
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  multiline
                  className="border border-[#CCCCCC] dark:border-authDark h-24 rounded-lg text-darkNeutral dark:text-lightText  pl-3  text-base"
                />
              </View>
            )}
            name="activation"
          />
          {errors.activation && (
            <Text className="text-red-600 mt-1">This field is required.</Text>
          )}

          <View>
            <View className="flex-row justify-start items-center gap-1 mt-5 mb-2">
              <Text className="text-[17px] text-darkNeutral dark:text-lightText">
                Is there a promo running?
              </Text>
              <Text className="text-red-600 text-base">*</Text>
            </View>

            <View className="flex-row items-center gap-5">
              <View className="flex-row items-center row-gap-1">
                <Text className="text-base text-darkNeutral dark:text-lightText">
                  Yes:
                </Text>
                <TouchableOpacity
                  onPress={() => setChecked(true)}
                  activeOpacity={0.4}
                >
                  {checked ? (
                    <MaterialIcons
                      name="radio-button-checked"
                      size={24}
                      color={checked ? COLORS.secondary : COLORS.authDark}
                    />
                  ) : (
                    <MaterialIcons
                      name="radio-button-unchecked"
                      size={21}
                      color={checked ? COLORS.secondary : COLORS.authDark}
                    />
                  )}
                </TouchableOpacity>
              </View>

              <View className="flex-row items-center row-gap-1">
                <Text className="text-base text-darkNeutral dark:text-lightText">
                  No:
                </Text>

                <TouchableOpacity
                  onPress={() => setChecked(false)}
                  activeOpacity={0.4}
                >
                  {!checked ? (
                    <MaterialIcons
                      name="radio-button-checked"
                      size={24}
                      color={!checked ? COLORS.secondary : COLORS.authDark}
                    />
                  ) : (
                    <MaterialIcons
                      name="radio-button-unchecked"
                      size={21}
                      color={!checked ? COLORS.secondary : COLORS.authDark}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <View className="flex-row justify-start items-center gap-1 mt-6 mb-2">
                    <Text className="text-[17px] text-darkNeutral dark:text-lightText">
                      What is the mechanism of the promo?
                    </Text>
                    <Text className="text-red-600 text-base">*</Text>
                  </View>
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    multiline
                    className="border border-[#CCCCCC] dark:border-authDark h-24 rounded-lg text-darkNeutral dark:text-lightText  pl-3  text-base"
                  />
                </View>
              )}
              name="activation"
            />
            {errors.activation && (
              <Text className="text-red-600 mt-1">This field is required.</Text>
            )}

            <View className="flex-row justify-start items-center gap-1 mt-6 mb-2">
              <Text className="text-[17px] text-darkNeutral dark:text-lightText">
                Date of activation or promo?
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}