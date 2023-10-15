import AnimatedLottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { getLocalData } from "../../../helpers/local.data.handler";
import { Schedule } from "../../../types/outlets";
import { Entypo } from "@expo/vector-icons";
import { COLORS } from "../../../common/colors";
import { showLogs } from "../../../helpers/logger";

export default function FridaySchedule() {
  const { width } = Dimensions.get("window");
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    async function getLocalScheduleData() {
      try {
        const localSchedules = await getLocalData("UserSchedule");
        const filteredSchedules = localSchedules?.filter(
          (schedule: Schedule) => schedule.day === "FRI"
        );
        setSchedules(filteredSchedules);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    }

    getLocalScheduleData();
  }, []);

  return (
    <ScrollView className="flex-1 bg-white dark:bg-darkTheme">
      <View>
        {!schedules || schedules?.length === 0 ? (
          <View>
            <View
              style={{
                width: width,
                height: 290,
              }}
            >
              <AnimatedLottieView
                source={require("../../../assets/animations/register.json")}
              />
            </View>
            <Text className="text-center text-base font-semibold text-darkNeutral dark:text-lightText">
              No Scheduled record for{" "}
              <Text className="text-primary">Friday</Text>
            </Text>
          </View>
        ) : (
          <View>
            {
              <FlatList
                keyExtractor={(schedules) => Math.random().toString()}
                scrollEnabled={false}
                data={schedules}
                renderItem={({ item: schedule }) => (
                  <View
                    className={`bg-secondary p-4 rounded-lg mt-5 flex-row justify-between items-start mx-5`}
                  >
                    <View>
                      <Text className="text-white text-[26px] font-bold mb-2">
                        {schedule.outletName}
                      </Text>
                      <Text className="text-white text-[16px] font-semibold">
                        {schedule.outletaddress}
                      </Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.6}>
                      <Entypo
                        name="dots-three-vertical"
                        size={22}
                        color={COLORS.lightText}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
            }
          </View>
        )}
      </View>
    </ScrollView>
  );
}
