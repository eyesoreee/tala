import { colors } from "@/constants/colors";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Pressable, Text, View } from "react-native";

interface RecentExpenseListItemProps {
  initial: string;
  title: string;
  subtitle: string;
  amount: string;
  onViewDetails?: () => void;
}

export default function RecentExpenseListItem({
  initial,
  title,
  subtitle,
  amount,
  onViewDetails,
}: RecentExpenseListItemProps) {
  return (
    <Pressable
      onPress={onViewDetails}
      className="flex-row items-center py-4 active:opacity-70"
    >
      <View className="w-12 h-12 rounded-full bg-secondary-container items-center justify-center">
        <Text className="font-bold text-on-secondary-container">{initial}</Text>
      </View>

      <View className="flex-1 ml-5">
        <Text className="font-bold text-md text-on-surface">{title}</Text>

        <Text className="text-sm text-on-surface-variant mt-1">{subtitle}</Text>
      </View>

      <View className="flex-row items-center gap-4">
        <Text className="font-bold text-xl text-on-surface">{amount}</Text>

        <Ionicons name="chevron-forward" size={20} color={colors.outline} />
      </View>
    </Pressable>
  );
}
