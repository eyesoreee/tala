import { Text, View } from "react-native";

interface LogoProps {
  tagline?: string;
}

export function Logo({ tagline }: LogoProps) {
  return (
    <View className="items-center gap-1.5">
      <Text className="text-4xl font-bold text-text-primary tracking-tight">
        Tala
      </Text>
      {tagline && <Text className="text-sm text-text-muted">{tagline}</Text>}
    </View>
  );
}
