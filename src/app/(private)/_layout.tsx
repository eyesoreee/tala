import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "family-ledger",
};

export default function PrivateLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
