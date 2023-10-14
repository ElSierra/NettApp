import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useState } from "react";
import Header from "../../components/header/Header";
import { AntDesign } from "@expo/vector-icons";
import AnimatedLottie from "lottie-react-native";
import { visits, weekDays } from "./mockData";

export default function CompletedVisits() {
  const { width } = Dimensions.get("window");
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [dataForCurrentDay, setDataForCurrentDay] = useState<any>([]);

  type WeekData = {
    day: string;
    shortForm: string;
  };

  function showWeekDataAndSetIndex(index: number, week: WeekData) {
    setCurrentIndex(index === currentIndex ? null : index);
    const dataForCurrentDay = visits.filter((visit) =>
      visit.date.includes(week.shortForm)
    );
    setDataForCurrentDay(dataForCurrentDay);
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-darkTheme">
      <Header />

      <ScrollView showsVerticalScrollIndicator={false} className="mx-3">
        <Text className="text-darkNeutral dark:text-lightText text-[17.4px]">
          Visits that have been completed for the week will appear here
        </Text>

        <View className="mt-10">
          {weekDays.map((week, index) => (
            <TouchableOpacity
              key={week.day}
              onPress={() => showWeekDataAndSetIndex(index, week)}
              activeOpacity={0.8}
              className="mb-3"
            >
              <View
                className={`bg-secondary p-4 rounded-tr-lg rounded-tl-lg flex-row items-center justify-between ${
                  index !== currentIndex && "rounded-br-lg rounded-bl-lg"
                }`}
              >
                <Text className="text-white text-[20px] font-semibold">
                  {week.day}
                </Text>
                {index === currentIndex ? (
                  <AntDesign name="up" size={18} color="white" />
                ) : (
                  <AntDesign name="down" size={18} color="white" />
                )}
              </View>
              {index === currentIndex && (
                <View
                  className={`border border-secondary bg-gray-100 dark:bg-darkNeutral rounded-bl-lg rounded-br-lg ${
                    index === weekDays.length - 1 && "mb-10"
                  }`}
                >
                  {dataForCurrentDay.length === 0 ? (
                    <View>
                      <View
                        style={{
                          width: width * 0.9,
                          height: 200,
                        }}
                      >
                        <AnimatedLottie
                          source={require("../../assets/animations/register.json")}
                        />
                      </View>
                      <Text className="text-darkNeutral dark:text-lightText text-[17px] text-center mb-3">
                        No Completed Visit Record for{" "}
                        <Text className="font-semibold text-primary">
                          {week.day}
                        </Text>
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <FlatList
                        keyExtractor={(dataForCurrentDay) =>
                          dataForCurrentDay.id
                        }
                        scrollEnabled={false}
                        data={dataForCurrentDay}
                        renderItem={({ item: visit }) => (
                          <View className="flex-row justify-between items-center p-3">
                            <Text className="text-base font-semibold w-40 text-darkNeutral dark:text-lightText">
                              {visit.outlet}
                            </Text>
                            <Text className="text-base font-semibold text-darkNeutral dark:text-lightText">
                              {visit.date}
                            </Text>
                          </View>
                        )}
                      />
                    </View>
                  )}
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
