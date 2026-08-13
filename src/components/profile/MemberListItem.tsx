import { MemberRole } from "@/constants/enums";
import { cn } from "@/lib/cn";
import { getInitials } from "@/utils/format";

import { Text, View } from "react-native";

const AVATAR_TONES = [
  "bg-avatar-green",
  "bg-avatar-warm",
  "bg-avatar-blue",
  "bg-avatar-pink",
  "bg-avatar-sand",
];

interface MemberListItemProps {
  nickname: string;
  role: MemberRole;
  isMe?: boolean;
}

export default function MemberListItem({
  nickname,
  role,
  isMe = false,
}: MemberListItemProps) {
  const tone = AVATAR_TONES[nickname.length % AVATAR_TONES.length];
  const isOwner = role === "owner";

  return (
    <View className="flex-row items-center gap-3">
      <View
        className={cn(
          "w-11 h-11 rounded-full items-center justify-center",
          tone,
        )}
      >
        <Text className="font-bold text-text-avatar">
          {getInitials(nickname)}
        </Text>
      </View>

      <View className="flex-1">
        <View className="flex-row items-center gap-2">
          <Text
            className={cn("font-bold text-on-surface", isMe && "text-primary")}
            numberOfLines={1}
          >
            {nickname}
          </Text>

          {isMe && (
            <View className="bg-primary-container rounded-full px-2 py-0.5">
              <Text className="text-xs font-semibold text-on-primary-container">
                You
              </Text>
            </View>
          )}
        </View>
      </View>

      {isOwner && (
        <View className="bg-secondary-container rounded-full px-2.5 py-0.5">
          <Text className="text-xs font-semibold text-on-secondary-container">
            Owner
          </Text>
        </View>
      )}
    </View>
  );
}
