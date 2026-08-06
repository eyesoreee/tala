import { Text, View } from "react-native";

interface LabeledDividerProps {
  text: String;
}

export function LabeledDivider({ text }: LabeledDividerProps) {
  return (
    <View className="flex-row w-full items-center gap-4">
      <View className="flex-1 h-[1px] bg-gray-200" />
      <Text className="text-gray-300">{text}</Text>
      <View className="flex-1 h-[1px] bg-gray-200" />
    </View>
  );
}
