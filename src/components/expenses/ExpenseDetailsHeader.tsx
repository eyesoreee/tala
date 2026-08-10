import { colors } from "@/constants/colors";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

interface ExpenseDetailsHeaderProps {
  onEdit: () => void;
}

export default function ExpenseDetailsHeader({
  onEdit,
}: ExpenseDetailsHeaderProps) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-6">
        <Pressable
          className="active:opacity-70"
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="chevron-back" size={20} color={colors.onBackground} />
        </Pressable>

        <Text className="text-3xl font-bold">Expense details</Text>
      </View>

      <Pressable className="active:opacity-70" onPress={onEdit}>
        <Ionicons name="create-outline" size={20} color={colors.onBackground} />
      </Pressable>
    </View>
  );
}
