import { BlockButton } from "@/components/BlockButton";
import { InputField } from "@/components/InputField";
import { colors } from "@/constants/colors";
import { useUpdateNickname } from "@/hooks/useUpdateNickname";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useEffect, useState } from "react";
import { Alert, Modal, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface EditNicknameModalProps {
  visible: boolean;
  familyId?: string;
  memberId?: string | null;
  currentNickname: string;
  onClose: () => void;
}

export default function EditNicknameModal({
  visible,
  familyId,
  memberId,
  currentNickname,
  onClose,
}: EditNicknameModalProps) {
  const insets = useSafeAreaInsets();
  const updateNickname = useUpdateNickname(familyId);

  const [nickname, setNickname] = useState(currentNickname);

  useEffect(() => {
    if (updateNickname.isError) {
      Alert.alert(
        "Update failed",
        updateNickname.error?.message ?? "Something went wrong.",
      );
    }
  }, [updateNickname.isError, updateNickname.error]);

  useEffect(() => {
    if (updateNickname.isSuccess) {
      onClose();
    }
  }, [updateNickname.isSuccess, onClose]);

  const trimmed = nickname.trim();
  const canSave = trimmed.length > 0 && !!memberId && !updateNickname.isPending;

  const handleSave = () => {
    if (!canSave || !memberId) return;
    updateNickname.mutate({ memberId, nickname: trimmed });
  };

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
          accessibilityLabel="Close edit nickname modal"
        />

        <View
          className="bg-surface rounded-t-3xl px-6 pt-3 gap-6"
          style={{ paddingBottom: Math.max(insets.bottom, 16) + 8 }}
        >
          <View className="self-center w-10 h-1 rounded-full bg-outline-variant mb-2" />

          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="font-bold text-xl text-on-surface">
                Edit nickname
              </Text>
              <Text className="text-sm text-on-surface-variant mt-1">
                How should your family know you in this ledger?
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

          <InputField
            label="Nickname"
            text={nickname}
            onChangeText={setNickname}
            placeholder="Your nickname"
          />

          <BlockButton
            text="Save changes"
            onPress={handleSave}
            disabled={!canSave}
          />
        </View>
      </View>
    </Modal>
  );
}
