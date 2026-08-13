import { colors } from "@/constants/colors";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Alert, Pressable, Text, View } from "react-native";

interface FamilyInfoCardProps {
  familyName: string;
  inviteCode: string;
}

export default function FamilyInfoCard({
  familyName,
  inviteCode,
}: FamilyInfoCardProps) {
  const onCopyInviteCode = () => {
    Alert.alert(
      "Invite code copied",
      `Share "${inviteCode}" with your family.`,
    );
  };

  return (
    <View className="bg-surface rounded-2xl p-6 gap-4">
      <View className="flex-row items-center gap-4">
        <View className="w-12 h-12 rounded-2xl bg-primary-container items-center justify-center">
          <Ionicons name="people" size={24} color={colors.onPrimaryContainer} />
        </View>

        <View className="flex-1">
          <Text className="text-xs font-medium text-text-secondary uppercase tracking-wide">
            Family
          </Text>
          <Text className="font-bold text-lg text-on-surface" numberOfLines={1}>
            {familyName}
          </Text>
        </View>
      </View>

      <View className="h-px bg-outline-variant/50" />

      <View className="flex-row items-center justify-between">
        <View className="flex-1 mr-4">
          <Text className="text-xs font-medium text-text-secondary uppercase tracking-wide">
            Invite code
          </Text>
          <Text className="font-bold text-lg text-primary mt-0.5">
            {inviteCode || "—"}
          </Text>
        </View>

        {inviteCode ? (
          <Pressable
            onPress={onCopyInviteCode}
            className="flex-row items-center gap-1.5 bg-primary-container rounded-full px-4 py-2 active:opacity-70"
            accessibilityRole="button"
            accessibilityLabel="Copy invite code"
          >
            <Ionicons
              name="copy-outline"
              size={16}
              color={colors.onPrimaryContainer}
            />
            <Text className="font-bold text-sm text-on-primary-container">
              Copy
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
