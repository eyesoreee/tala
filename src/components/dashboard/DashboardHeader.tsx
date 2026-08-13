import { Pressable, Text, View } from "react-native";

interface DashboardHeaderProps {
  nickname: string;
  familyName: string;
  initials: string;
  onAvatarPress?: () => void;
}

export default function DashboardHeader({
  nickname,
  familyName,
  initials,
  onAvatarPress,
}: DashboardHeaderProps) {
  return (
    <View className="flex-row justify-between items-center w-full">
      <View className="flex-1 gap-1 pr-4">
        <Text className="text-sm text-text-muted truncate" numberOfLines={1}>
          Welcome back, {nickname}
        </Text>
        <Text
          className="font-bold text-4xl text-on-background truncate"
          numberOfLines={1}
        >
          {familyName}
        </Text>
      </View>

      <Pressable
        onPress={onAvatarPress}
        className="bg-primary-container rounded-full w-11 h-11 items-center justify-center active:opacity-70"
      >
        <Text className="font-bold text-on-primary-container">{initials}</Text>
      </Pressable>
    </View>
  );
}
