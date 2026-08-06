import { Text, View } from "react-native";

interface LabeledDividerProps {
  text: string;
}

export function LabeledDivider({ text }: LabeledDividerProps) {
  return (
    <View className="flex-row w-full items-center gap-4">
      <View className="flex-1 h-[1px] bg-border" />
      <Text className="text-sm text-text-muted">{text}</Text>
      <View className="flex-1 h-[1px] bg-border" />
    </View>
  );
}
