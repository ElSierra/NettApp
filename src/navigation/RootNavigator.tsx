import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { RootStackParamList } from "../types/navigation";
import TabsNavigator from "./TabNavigator";
import Onboarding from "../screens/onboarding/Onboarding";
import { COLORS } from "../common/colors";
import Login from "../screens/login/Login";
import ForgotPassword from "../screens/forgot_password/ForgotPassword";
import Home from "../screens/home/Home";
import ViewOutlets from "../screens/outlets_view/ViewOutlets";
import OutletDetails from "../screens/outlet_details/OutletDetails";
import CreateOutlet from "../screens/create_outlet/CreateOutlet";
import CompetitionReview from "../screens/competition_review/CompetitionReview";
import CompletedVisits from "../screens/completed_visits/CompletedVisits";
import ScheduledVisits from "../screens/scheduled_visits/ScheduledVisits";
import ViewProducts from "../screens/products_view/ViewProducts";

const RootStack = createNativeStackNavigator<RootStackParamList>();

async function checkOnboardingStatus() {
  const previousOnboardingCheck = await AsyncStorage.getItem(
    "userHasOnboarded"
  );
  return previousOnboardingCheck === "true";
}

export default function RootNavigator() {
  const [userHasOnboarded, setUserHasOnboarded] = useState(false);
  const [isOnboardingCheckComplete, setIsOnboardingCheckComplete] =
    useState(false);

  useEffect(() => {
    async function getOnboardingCheckResults() {
      const hasOnboarded = await checkOnboardingStatus();
      setUserHasOnboarded(hasOnboarded);
      setIsOnboardingCheckComplete(true);
    }

    getOnboardingCheckResults();
  }, []);

  if (!isOnboardingCheckComplete)
    return (
      <ActivityIndicator
        color={COLORS.primary}
        size="large"
        className="pt-20"
      />
    );

  return (
    <RootStack.Navigator
      initialRouteName={userHasOnboarded ? "TabStack" : "Onboarding"}
    >
      <RootStack.Screen
        name="TabStack"
        component={TabsNavigator}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
      <RootStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
      <RootStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
      <RootStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          presentation: "modal",
        }}
      />
      <RootStack.Screen
        name="ViewOutlets"
        component={ViewOutlets}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
      <RootStack.Screen
        name="OutletDetailsScreen"
        component={OutletDetails}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
      <RootStack.Screen
        name="CreateOutlet"
        component={CreateOutlet}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
      <RootStack.Screen
        name="ScheduledVisits"
        component={ScheduledVisits}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
      <RootStack.Screen
        name="CompletedVisits"
        component={CompletedVisits}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
      <RootStack.Screen
        name="ViewProducts"
        component={ViewProducts}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
      <RootStack.Screen
        name="CompetitionReview"
        component={CompetitionReview}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
    </RootStack.Navigator>
  );
}
