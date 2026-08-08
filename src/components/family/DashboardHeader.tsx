import { Pressable, Text, View } from "react-native";

interface DashboardHeaderProps {
  nickname: string;
  familyName: string;
  initials: string;
}

export default function DashboardHeader({
  nickname,
  familyName,
  initials,
}: DashboardHeaderProps) {
  return (
    <View className="flex-row justify-between items-center w-full">
      <View className="flex-1 gap-1 pr-4">
        <Text
          className="text-sm text-on-background/60 truncate"
          numberOfLines={1}
        >
          Welcome back, {nickname}
        </Text>
        <Text className="font-bold text-4xl truncate" numberOfLines={1}>
          {familyName}
        </Text>
      </View>

      <Pressable className="bg-primary-container rounded-full p-4 items-center justify-center active:opacity-70">
        <Text className="font-bold text-on-primary-container">{initials}</Text>
      </Pressable>
    </View>
  );
}
