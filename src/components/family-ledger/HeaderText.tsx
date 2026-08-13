import { Text, View } from "react-native";

interface HeaderTextProps {
  title: string;
  subtitle: string;
}

export default function HeaderText({ title, subtitle }: HeaderTextProps) {
  return (
    <View className="gap-2 pb-8">
      <Text className="text-3xl font-bold text-on-background">{title}</Text>

      <Text className="text-text-muted text-base">{subtitle}</Text>
    </View>
  );
}
