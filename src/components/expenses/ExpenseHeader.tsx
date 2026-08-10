import { colors } from "@/constants/colors";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Pressable, Text, View } from "react-native";

interface ExpenseHeaderProps {
  onPress?: () => void;
}

export default function ExpenseHeader({ onPress }: ExpenseHeaderProps) {
  return (
    <View className="flex-row justify-between items-center">
      <Text className="text-3xl text-on-background font-bold">Expenses</Text>

      <Pressable
        onPress={onPress}
        className="active:opacity-70 flex-row items-center justify-between gap-2"
      >
        <Text className="text-primary font-bold">August 2026</Text>
        <Ionicons name="chevron-down" size={20} color={colors.primary} />
      </Pressable>
    </View>
  );
}
