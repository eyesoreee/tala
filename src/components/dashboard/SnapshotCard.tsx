import { Text, View } from "react-native";

interface SnapshotCardProps {
  label: string;
  value: string;
  cardColor: string;
  textColor: string;
}

export default function SnapshotCard({
  label,
  value,
  cardColor,
  textColor,
}: SnapshotCardProps) {
  return (
    <View className={`flex-1 rounded-2xl p-8 gap-3 ${cardColor}`}>
      <Text className={`text-sm ${textColor}/50`}>{label}</Text>
      <Text className={`text-3xl font-bold ${textColor}`}>{value}</Text>
    </View>
  );
}
