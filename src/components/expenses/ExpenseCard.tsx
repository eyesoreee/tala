import { CATEGORIES } from "@/constants/categories";
import { colors } from "@/constants/colors";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Pressable, Text, View } from "react-native";
import CategoryChip from "./CategoryChip";

interface ExpenseCardProps {
  initial: string;
  category: CATEGORIES;
  title: string;
  paidBy: string;
  amount: string;
  onExpenseClick?: () => void;
}

export default function ExpenseCard({
  initial,
  category,
  title,
  paidBy,
  amount,
  onExpenseClick,
}: ExpenseCardProps) {
  return (
    <Pressable
      onPress={onExpenseClick}
      className="flex-row items-center py-4 active:opacity-70"
    >
      <View className="w-12 h-12 rounded-full bg-secondary-container items-center justify-center">
        <Text className="font-bold text-on-secondary-container">{initial}</Text>
      </View>

      <View className="flex-1 ml-5 gap-1">
        <Text className="font-bold text-md text-on-surface">{title}</Text>

        <CategoryChip category={category} />

        <Text className="text-sm text-on-surface-variant mt-1">
          Paid by {paidBy}
        </Text>
      </View>

      <View className="flex-row items-center gap-4">
        <Text className="font-bold text-xl text-on-surface">P{amount}</Text>

        <Ionicons name="chevron-forward" size={20} color={colors.outline} />
      </View>
    </Pressable>
  );
}
