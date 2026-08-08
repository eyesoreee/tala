import { Stack } from "expo-router";

export default function FamilyLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="add-expense" options={{ presentation: "modal" }} />
    </Stack>
  );
}
