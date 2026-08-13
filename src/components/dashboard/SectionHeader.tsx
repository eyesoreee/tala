import { colors } from "@/constants/colors";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Pressable, Text, View } from "react-native";

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onPress?: () => void;
};

export default function SectionHeader({
  title,
  actionLabel,
  onPress,
}: SectionHeaderProps) {
  return (
    <View className="flex-row justify-between items-center">
      <Text className="font-bold text-2xl text-on-background">{title}</Text>

      {actionLabel && (
        <Pressable
          onPress={onPress}
          className="flex-row items-center justify-center gap-2 active:opacity-70"
        >
          <Text className="text-primary text-sm font-semibold">
            {actionLabel}
          </Text>
          <Ionicons name="arrow-forward" size={14} color={colors.primary} />
        </Pressable>
      )}
    </View>
  );
}
