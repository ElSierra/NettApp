import * as Network from "expo-network";

export async function getUserNetworkStatus() {
  const isUserOnline = await Network.getNetworkStateAsync();
  return isUserOnline;
}
