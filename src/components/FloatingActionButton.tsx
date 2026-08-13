import { colors } from "@/constants/colors";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Pressable } from "react-native";

interface FloatingActionButtonProps {
  onPress?: () => void;
}

export default function FloatingActionButton({
  onPress,
}: FloatingActionButtonProps) {
  return (
    <Pressable
      className="
        absolute
        bottom-6
        right-6
        w-16
        h-16
        rounded-full
        bg-primary
        items-center
        justify-center
        active:opacity-70
        shadow-lg
        shadow-primary/30
      "
      onPress={onPress}
    >
      <Ionicons name="add" size={28} color={colors.onPrimary} />
    </Pressable>
  );
}
