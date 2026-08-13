import { colors } from "@/constants/colors";
import { cn } from "@/lib/cn";
import {
  Ionicons,
  IoniconsIconName,
} from "@react-native-vector-icons/ionicons";
import { Pressable, Text, View } from "react-native";

interface ActionCardProps {
  icon: IoniconsIconName;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  disabled?: boolean;
  tileBg?: string;
  iconColor?: string;
  iconSize?: number;
  chevronColor?: string;
}

export function ActionCard({
  icon,
  title,
  subtitle,
  onPress,
  disabled = false,
  tileBg = "bg-primary-container",
  iconColor = colors.onPrimaryContainer,
  iconSize = 28,
  chevronColor = colors.outline,
}: ActionCardProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className={cn(
        "w-full flex-row items-center gap-4 p-6 bg-surface border border-border rounded-2xl active:opacity-80",
        disabled && "opacity-50",
      )}
    >
      <View
        className={cn(
          "items-center justify-center size-16 rounded-3xl",
          tileBg,
        )}
      >
        <Ionicons name={icon} size={iconSize} color={iconColor} />
      </View>

      <View className="flex-1">
        <Text
          numberOfLines={1}
          className="text-base font-semibold text-text-primary"
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            numberOfLines={1}
            className="mt-0.5 text-sm text-text-secondary"
          >
            {subtitle}
          </Text>
        )}
      </View>

      <Ionicons name="chevron-forward" size={20} color={chevronColor} />
    </Pressable>
  );
}
