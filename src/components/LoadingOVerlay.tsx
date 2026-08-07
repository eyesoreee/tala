import { colors } from "@/constants/colors";
import { ActivityIndicator, Text, View } from "react-native";

export function LoadingOverlay() {
  return (
    <View className="absolute inset-0 bg-black/40 items-center justify-center z-50">
      <View className="bg-white p-5 rounded-2xl shadow-lg items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary} />
        <Text className="mt-3 text-gray-700 font-medium">Loading...</Text>
      </View>
    </View>
  );
}
