import { colors } from "@/constants/colors";
import {
  Ionicons,
  IoniconsIconName,
} from "@react-native-vector-icons/ionicons";
import { Pressable, Text, View } from "react-native";

interface ProfileMenuRowProps {
  icon: IoniconsIconName;
  label: string;
  iconContainerClassName: string;
  iconColor: string;
  textClassName?: string;
  onPress: () => void;
  showChevron?: boolean;
}

export default function ProfileMenuRow({
  icon,
  label,
  iconContainerClassName,
  iconColor,
  textClassName = "text-on-surface",
  onPress,
  showChevron = true,
}: ProfileMenuRowProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center py-4 active:opacity-70"
      accessibilityRole="button"
    >
      <View
        className={`w-10 h-10 rounded-full items-center justify-center ${iconContainerClassName}`}
      >
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>

      <Text className={`flex-1 ml-4 font-medium text-base ${textClassName}`}>
        {label}
      </Text>

      {showChevron && (
        <Ionicons name="chevron-forward" size={20} color={colors.outline} />
      )}
    </Pressable>
  );
}
