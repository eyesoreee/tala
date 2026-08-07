import { Pressable, Text } from "react-native";

type Variant = "primary" | "secondary";

interface BlockButtonProps {
  text: string;
  variant?: Variant;
  onPress?: () => void;
}

const VARIANT_STYLES: Record<Variant, { bg: string; text: string }> = {
  primary: { bg: "bg-primary", text: "text-on-primary" },
  secondary: {
    bg: "bg-surface border border-border",
    text: "text-text-primary",
  },
};

export function BlockButton({
  text,
  variant = "primary",
  onPress,
}: BlockButtonProps) {
  const { bg, text: textColor } = VARIANT_STYLES[variant];

  return (
    <Pressable
      onPress={onPress}
      className={`w-full items-center py-4 rounded-xl active:opacity-80 ${bg}`}
    >
      <Text className={`text-base font-semibold ${textColor}`}>{text}</Text>
    </Pressable>
  );
}
