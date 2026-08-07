import { Text, View } from "react-native";

interface HeaderTextProps {
  title: string;
  subtitle: string;
}

export default function HeaderText({ title, subtitle }: HeaderTextProps) {
  return (
    <View className="gap-2 pb-8">
      <Text className="text-body font-bold text-3xl">{title}</Text>

      <Text className="text-text-faint text-md">{subtitle}</Text>
    </View>
  );
}
