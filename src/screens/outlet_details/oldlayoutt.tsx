import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Header from "../../components/header/Header";
import { outletsData } from "../outlets_view/data";
import { Outlet } from "../../types/outlets";
import { COLORS } from "../../common/colors";
import OutletInfo from "./OutletInfo";
import TradeVisits from "./TradeVisits";

interface OutletParam {
  outletCode: string;
}

const OutletDetails = () => {
  const { outletCode } = useRoute().params as OutletParam;
  const [currentOutlet, setCurrentOutlet] = useState<Outlet>();
  const [activeTab, setActiveTab] = useState("Outlet Details");

  useEffect(() => {
    const outlet = outletsData.find(
      (outlet) => outlet.outletCode === outletCode
    );
    setCurrentOutlet(outlet);
  }, [outletCode]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />
      <ScrollView>
        <View className="flex-row border-b border-b-gray-50">
          <TouchableOpacity
            className="flex-1 py-2 items-center"
            style={
              activeTab === "Outlet Details" && {
                borderBottomColor: COLORS.secondary,
                borderBottomWidth: 2,
              }
            }
            onPress={() => setActiveTab("Outlet Details")}
          >
            <Text className="text-[16px] font-semibold">Outlet Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 py-2 items-center"
            style={
              activeTab === "Trade Visits" && {
                borderBottomColor: COLORS.secondary,
                borderBottomWidth: 2,
              }
            }
            onPress={() => setActiveTab("Trade Visits")}
          >
            <Text className="text-[16px] font-semibold">Trade Visits</Text>
          </TouchableOpacity>
        </View>
        {activeTab === "Outlet Details" ? (
          <OutletInfo outlet={currentOutlet || undefined} />
        ) : (
          <TradeVisits outlet={currentOutlet || undefined} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OutletDetails;
