import { colors } from "@/constants/colors";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Text, View } from "react-native";

interface LogoProps {
  tagline?: string;
}

export function Logo({ tagline }: LogoProps) {
  return (
    <View className="items-center gap-3">
      <View className="w-20 h-20 rounded-3xl bg-primary-container items-center justify-center">
        <Ionicons name="wallet" size={36} color={colors.primary} />
      </View>
      <View className="items-center gap-1">
        <Text className="text-4xl font-bold text-text-primary tracking-tight">
          Tala
        </Text>
        {tagline && <Text className="text-sm text-text-muted">{tagline}</Text>}
      </View>
    </View>
  );
}
