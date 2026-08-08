import { MemberRole } from "@/constants/enums";
import { cn } from "@/lib/cn";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Pressable, Text, View } from "react-native";

interface FamilyCardProps {
  name: string;
  role: MemberRole;
  onPress?: () => void;
}

export function FamilyCard({ name, role, onPress }: FamilyCardProps) {
  const isOwner = role === "owner";

  return (
    <Pressable
      onPress={onPress}
      className="active:opacity-80 w-full flex-row items-center gap-4 p-6 bg-surface border border-border rounded-xl"
    >
      <View className="items-center justify-center size-16 rounded-3xl bg-primary-container">
        <Ionicons name="people" size={26} color="#123128" />
      </View>

      <View className="flex-1">
        <Text
          numberOfLines={1}
          className="text-base font-semibold text-text-primary"
        >
          {name}
        </Text>
        <View
          className={cn(
            "mt-1.5 self-start rounded-full px-2.5 py-0.5",
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

      <Ionicons name="chevron-forward" size={20} color="#79837d" />
    </Pressable>
  );
}
