import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "family-ledger",
  anchor: "family-ledger",
};

export default function PrivateLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="create-family" options={{ presentation: "modal" }} />
      <Stack.Screen name="join-family" options={{ presentation: "modal" }} />
    </Stack>
  );
}
