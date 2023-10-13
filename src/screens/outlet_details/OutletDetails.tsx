import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView, ScrollView } from "react-native";
import Header from "../../components/header/Header";
import { outletsData } from "../outlets_view/data";
import { Outlet } from "../../types/outlets";
import { COLORS } from "../../common/colors";
import OutletInfo from "./OutletInfo";
import TradeVisits from "./TradeVisits";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "../../context/theme/ThemeContext";

interface OutletParam {
  outletCode: string;
}

const Tab = createMaterialTopTabNavigator();

const OutletDetails = () => {
  const { outletCode } = useRoute().params as OutletParam;
  const [currentOutlet, setCurrentOutlet] = useState<Outlet>();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const outlet = outletsData.find(
      (outlet) => outlet.outletCode === outletCode
    );
    setCurrentOutlet(outlet);
  }, [outletCode]);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-darkTheme">
      <Header />

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: isDarkMode ? COLORS.lightText : "#000",
          tabBarInactiveTintColor: isDarkMode ? COLORS.lightText : "#000",

          tabBarStyle: {
            backgroundColor: isDarkMode ? COLORS.darkTheme : "#fff",
          },
          tabBarLabelStyle: {
            fontWeight: "bold",
            fontSize: 15,
          },
          tabBarIndicatorStyle: {
            borderBottomColor: COLORS.secondary,
            borderBottomWidth: 2,
          },
        }}
      >
        <Tab.Screen
          name="OutletInfo"
          children={() => <OutletInfo outlet={currentOutlet} />}
          options={{
            title: "Outlet Details",
          }}
        />
        <Tab.Screen
          name="TradeVisits"
          children={() => <TradeVisits outlet={currentOutlet} />}
          options={{
            title: "Trade Visits",
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default OutletDetails;
