import { View, Text, SafeAreaView, TextInput, ScrollView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import Header from "../../components/header/Header";
import { Entries } from "../../types/outlets";
import CustomButton from "../../common/button";
import SelectDropdown from "react-native-select-dropdown";
import { COLORS } from "../../common/colors";
import { useTheme } from "../../context/theme/ThemeContext";

export default function CreateOutlet() {
  const { isDarkMode } = useTheme();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Entries>();

  function onSubmit(data: Entries) {
    console.log(data);
  }

  const channels = ["On Trade", "Off Trade"];
  const subChannels = [
    "Night Club",
    "Bar / Lounge",
    "Restaurant",
    "Hotel",
    "Café",
  ];

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-darkTheme">
      <Header />

      <ScrollView showsVerticalScrollIndicator={false} className="mx-3">
        <View className="border border-gray-300 dark:border-authDark p-4 rounded-lg">
          <View className="border-b-4 border-b-[#D9D9D9] dark:border-authDark relative mb-3">
            <Text className="text-2xl text-secondary dark:text-secondaryLight text-center font-bold mb-1">
              Register Outlet
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
                  <Text className="text-[17px] text-darkNeutral dark:text-lightText ">
                    Outlet Name
                  </Text>
                  <Text className="text-red-600 text-base">*</Text>
                </View>
                <TextInput
                  placeholder="Outlet Name"
                  onBlur={onBlur}
                  placeholderTextColor={
                    isDarkMode ? COLORS.authDark : COLORS.darkNeutral
                  }
                  onChangeText={onChange}
                  value={value}
                  className="border border-[#CCCCCC] dark:border-authDark h-11 rounded-lg pl-3 text-base text-darkNeutral dark:text-lightText"
                />
              </View>
            )}
            name="outletName"
          />
          {errors.outletName && (
            <Text className="text-red-600 mt-1">Outlet Name is required.</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <View className="flex-row justify-start items-center gap-1 mt-5 mb-2">
                  <Text className="text-[17px] text-darkNeutral dark:text-lightText ">
                    Address
                  </Text>
                  <Text className="text-red-600 text-base">*</Text>
                </View>
                <TextInput
                  placeholder="Please Specity Outlet Address"
                  onBlur={onBlur}
                  placeholderTextColor={
                    isDarkMode ? COLORS.authDark : COLORS.darkNeutral
                  }
                  onChangeText={onChange}
                  value={value}
                  className="border border-[#CCCCCC] dark:border-authDark h-11 rounded-lg pl-3 text-base mt-2 text-darkNeutral dark:text-lightText"
                />
              </View>
            )}
            name="address"
          />
          {errors.address && (
            <Text className="text-red-600 mt-1">
              Outlet Address is required.
            </Text>
          )}

          <View>
            <View className="flex-row justify-start items-center gap-1 mt-5 mb-2">
              <Text className="text-[17px] text-darkNeutral dark:text-lightText">
                State
              </Text>
              <Text className="text-red-600 text-base">*</Text>
            </View>
            <SelectDropdown
              data={channels}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
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

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <Text className="text-[17px] text-darkNeutral dark:text-lightText mt-5">
                  Region
                </Text>
                <TextInput
                  onBlur={onBlur}
                  placeholderTextColor={
                    isDarkMode ? COLORS.authDark : COLORS.darkNeutral
                  }
                  onChangeText={onChange}
                  value={value}
                  className="border border-[#CCCCCC] dark:border-authDark h-11 rounded-lg pl-3 text-base mt-2 text-darkNeutral dark:text-lightText"
                  editable={false}
                />
              </View>
            )}
            name="region"
          />
          {errors.region && (
            <Text className="text-red-600 mt-1">
              Outlet Region is required.
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <View className="flex-row justify-start items-center gap-1 mt-5 mb-2">
                  <Text className="text-[17px] text-darkNeutral dark:text-lightText ">
                    City
                  </Text>
                  <Text className="text-red-600 text-base">*</Text>
                </View>
                <TextInput
                  onBlur={onBlur}
                  placeholderTextColor={
                    isDarkMode ? COLORS.authDark : COLORS.darkNeutral
                  }
                  onChangeText={onChange}
                  value={value}
                  className="border border-[#CCCCCC] dark:border-authDark h-11 rounded-lg pl-3 text-base mt-2 text-darkNeutral dark:text-lightText"
                  editable={false}
                />
              </View>
            )}
            name="city"
          />
          {errors.city && (
            <Text className="text-red-600 mt-1">City is required.</Text>
          )}

          <View>
            <View className="flex-row justify-start items-center gap-1 mt-5 mb-2">
              <Text className="text-[17px] text-darkNeutral dark:text-lightText">
                Channel
              </Text>
              <Text className="text-red-600 text-base">*</Text>
            </View>
            <SelectDropdown
              data={channels}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
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

          <View>
            <View className="flex-row justify-start items-center gap-1 mt-5 mb-2">
              <Text className="text-[17px] text-darkNeutral dark:text-lightText">
                Sub Channel
              </Text>
              <Text className="text-red-600 text-base">*</Text>
            </View>
            <SelectDropdown
              data={subChannels}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
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

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <Text className="text-[17px] text-darkNeutral dark:text-lightText mt-5">
                  Name of Manager
                </Text>
                <TextInput
                  placeholder="Manager Name"
                  onBlur={onBlur}
                  placeholderTextColor={
                    isDarkMode ? COLORS.authDark : COLORS.darkNeutral
                  }
                  onChangeText={onChange}
                  value={value}
                  className="border border-[#CCCCCC] dark:border-authDark h-11 rounded-lg pl-3 text-base mt-2 text-darkNeutral dark:text-lightText"
                />
              </View>
            )}
            name="managerName"
          />
          {errors.city && (
            <Text className="text-red-600 mt-1">Manager Name is required.</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <Text className="text-[17px] text-darkNeutral dark:text-lightText mt-5">
                  Phone No. of Manager
                </Text>
                <TextInput
                  placeholder="Manager Phone Number"
                  onBlur={onBlur}
                  placeholderTextColor={
                    isDarkMode ? COLORS.authDark : COLORS.darkNeutral
                  }
                  onChangeText={onChange}
                  value={value}
                  className="border border-[#CCCCCC] dark:border-authDark h-11 rounded-lg  pl-3 text-base mt-2 text-darkNeutral dark:text-lightText"
                />
              </View>
            )}
            name="managerPhone"
          />
          {errors.city && (
            <Text className="text-red-600 mt-1">
              Manager Phone Number is required.
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <Text className="text-[17px] text-darkNeutral dark:text-lightText mt-5">
                  Supplier(s)
                </Text>
                <TextInput
                  placeholder="Please specify Outlet Supplier(s)"
                  onBlur={onBlur}
                  placeholderTextColor={
                    isDarkMode ? COLORS.authDark : COLORS.darkNeutral
                  }
                  onChangeText={onChange}
                  value={value}
                  className="border border-[#CCCCCC] dark:border-authDark dark:border-authDark h-11 rounded-lg pl-3 text-base text-darkNeutral dark:text-lightText mt-2"
                />
              </View>
            )}
            name="suppliers"
          />
          {errors.city && (
            <Text className="text-red-600 mt-1">Supplier(s) required.</Text>
          )}

          <CustomButton
            variant="large"
            clickHandler={handleSubmit(onSubmit)}
            classnames="mt-10"
          >
            Register
          </CustomButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
