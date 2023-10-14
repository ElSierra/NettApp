import AsyncStorage from "@react-native-async-storage/async-storage";
import { showLogs } from "./logger";

export async function saveDataLocally(identifier: string, dataToSave: any) {
  await AsyncStorage.setItem(identifier, JSON.stringify(dataToSave));
}

export async function getLocalData(identifier: string) {
  const localData = await AsyncStorage.getItem(identifier);
  const parsedLocalData = await JSON.parse(localData!);
  return parsedLocalData;
}
