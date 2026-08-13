import { MemberRole } from "@/constants/enums";
import { cn } from "@/lib/cn";
import { Text, View } from "react-native";

interface ProfileHeaderProps {
  nickname: string;
  initials: string;
  role: MemberRole;
}

export default function ProfileHeader({
  nickname,
  initials,
  role,
}: ProfileHeaderProps) {
  const isOwner = role === "owner";

  return (
    <View className="items-center gap-3">
      <View className="w-24 h-24 rounded-full bg-avatar-mint-dark items-center justify-center">
        <Text className="font-bold text-4xl text-text-avatar">{initials}</Text>
      </View>

      <View className="items-center gap-1">
        <Text
          className="font-bold text-2xl text-on-background"
          numberOfLines={1}
        >
          {nickname}
        </Text>

        <View
          className={cn(
            "rounded-full px-3 py-0.5",
            isOwner ? "bg-secondary-container" : "bg-surface-chip",
          )}
        >
          <Text
            className={cn(
              "text-xs font-semibold",
              isOwner ? "text-on-secondary-container" : "text-text-secondary",
            )}
          >
            {isOwner ? "Owner" : "Member"}
          </Text>
        </View>
      </View>
    </View>
  );
}
