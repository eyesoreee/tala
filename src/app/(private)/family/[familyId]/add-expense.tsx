import { ModalHeader } from "@/components/ModalHeader";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddExpenseScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-8 py-4">
        <ModalHeader title="Add expense" />

        <View className="flex-1 items-center justify-center gap-2">
          <Text className="text-2xl font-bold text-text-primary">
            Coming soon
          </Text>
          <Text className="text-sm text-text-secondary">
            Expense entry is not implemented yet.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
