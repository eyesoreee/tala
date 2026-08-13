import { colors } from "@/constants/colors";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Modal, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AccountMenuProps {
  visible: boolean;
  nickname: string;
  initials: string;
  familyName: string;
  onClose: () => void;
  onGoToProfile: () => void;
  onSignOut: () => void;
}

export default function AccountMenu({
  visible,
  nickname,
  initials,
  familyName,
  onClose,
  onGoToProfile,
  onSignOut,
}: AccountMenuProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        <Pressable
          className="absolute inset-0 bg-black/40"
          onPress={onClose}
          accessibilityLabel="Close account menu"
        />

        <View
          className="bg-surface rounded-t-3xl px-6 pt-3 items-stretch"
          style={{ paddingBottom: Math.max(insets.bottom, 16) + 8 }}
        >
          <View className="self-center w-10 h-1 rounded-full bg-outline-variant mb-5" />

          <View className="flex-row items-center gap-4 pb-6">
            <View className="w-16 h-16 rounded-full bg-avatar-mint-dark items-center justify-center">
              <Text className="font-bold text-2xl text-text-avatar">
                {initials}
              </Text>
            </View>

            <View className="flex-1 mr-4">
              <Text className="font-bold text-xl text-on-surface truncate">
                {nickname}
              </Text>
              <Text className="text-sm text-on-surface-variant mt-1 truncate">
                {familyName}
              </Text>
            </View>

            <Pressable
              onPress={onClose}
              hitSlop={8}
              className="size-10 items-center justify-center rounded-full bg-surface-chip active:opacity-70"
            >
              <Ionicons name="close" size={20} color={colors.textSecondary} />
            </Pressable>
          </View>

          <Pressable
            onPress={onGoToProfile}
            className="flex-row items-center py-4 active:opacity-70"
          >
            <View className="w-10 h-10 rounded-full bg-primary-container items-center justify-center">
              <Ionicons
                name="person-outline"
                size={20}
                color={colors.onPrimaryContainer}
              />
            </View>

            <Text className="flex-1 ml-4 font-medium text-base text-on-surface">
              Go to profile
            </Text>

            <Ionicons name="chevron-forward" size={20} color={colors.outline} />
          </Pressable>

          <View className="h-px bg-outline-variant" />

          <Pressable
            onPress={onSignOut}
            className="flex-row items-center py-4 active:opacity-70"
          >
            <View className="w-10 h-10 rounded-full bg-tint-red items-center justify-center">
              <Ionicons
                name="log-out-outline"
                size={20}
                color={colors.negative}
              />
            </View>

            <Text className="flex-1 ml-4 font-medium text-base text-negative">
              Sign out
            </Text>
          </Pressable>

          <Pressable
            onPress={onClose}
            className="bg-surface-chip rounded-full py-3 items-center mt-5 active:opacity-70"
          >
            <Text className="font-bold text-base text-on-surface">Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
