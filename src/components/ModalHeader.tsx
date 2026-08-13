import { colors } from "@/constants/colors";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

interface ModalHeaderProps {
  title: string;
}

function closeModal() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace("/family-ledger");
  }
}

export function ModalHeader({ title }: ModalHeaderProps) {
  return (
    <View className="w-full flex-row items-center justify-between py-2">
      <Pressable
        onPress={closeModal}
        hitSlop={12}
        className="size-10 items-center justify-center rounded-full bg-surface-chip active:opacity-60"
      >
        <Ionicons name="close" size={20} color={colors.textSecondary} />
      </Pressable>

      <Text className="text-base font-semibold text-text-primary">{title}</Text>

      <View className="size-10" />
    </View>
  );
}
