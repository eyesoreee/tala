import { colors } from "@/constants/colors";
import { FamilyMember } from "@/constants/family-member";
import { useRecordSettlement } from "@/hooks/useRecordSettlement";
import { formatNumber, getInitials } from "@/utils/format";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SettleModalProps {
  visible: boolean;
  familyId?: string;
  myMemberId?: string | null;
  member: FamilyMember | null;
  amountOwed: number;
  expenseId?: string | null;
  titlePrefix?: string;
  onClose: () => void;
  onSettled: () => void;
}

export default function SettleModal({
  visible,
  familyId,
  myMemberId,
  member,
  amountOwed,
  expenseId,
  titlePrefix,
  onClose,
  onSettled,
}: SettleModalProps) {
  const insets = useSafeAreaInsets();
  const settlement = useRecordSettlement(familyId);

  const [amount, setAmount] = useState(() => String(amountOwed));
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (settlement.isError) {
      Alert.alert(
        "Settle failed",
        settlement.error?.message ?? "Something went wrong.",
      );
    }
  }, [settlement.isError, settlement.error]);

  useEffect(() => {
    if (settlement.isSuccess) {
      onSettled();
    }
  }, [settlement.isSuccess, onSettled]);

  const amountValue = Number(amount);
  const canConfirm =
    Number.isFinite(amountValue) && amountValue > 0 && !!member && !!myMemberId;

  const handleConfirm = () => {
    if (!canConfirm || !member || !myMemberId) return;

    settlement.mutate({
      fromMemberId: myMemberId,
      toMemberId: member.id,
      amount: amountValue,
      notes: notes.trim() || undefined,
      expenseId,
    });
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
          accessibilityLabel="Close settle modal"
        />

        {member && (
          <View
            className="bg-surface rounded-t-3xl px-6 pt-3"
            style={{ paddingBottom: Math.max(insets.bottom, 16) + 8 }}
          >
            <View className="self-center w-10 h-1 rounded-full bg-outline-variant mb-5" />

            <View className="flex-row items-center gap-4 pb-6">
              <View className="w-14 h-14 rounded-full bg-avatar-warm items-center justify-center">
                <Text className="font-bold text-xl text-text-avatar">
                  {getInitials(member.nickname)}
                </Text>
              </View>

              <View className="flex-1">
                <Text
                  className="font-bold text-xl text-on-surface"
                  numberOfLines={1}
                >
                  {titlePrefix ? `${titlePrefix} — ` : ""}Settle with{" "}
                  {member.nickname}
                </Text>
                <Text className="text-sm text-on-surface-variant mt-1">
                  {formatNumber(amountOwed)} owed
                </Text>
              </View>

              <Pressable
                onPress={onClose}
                hitSlop={8}
                className="active:opacity-70"
              >
                <Ionicons name="close" size={24} color={colors.outline} />
              </Pressable>
            </View>

            <View className="bg-primary-container rounded-2xl items-center justify-center p-8 gap-4">
              <Text className="text-on-primary-container/60 text-md">
                Amount
              </Text>

              <View className="flex-row items-center gap-6">
                <Text className="font-bold text-2xl text-on-primary-container">
                  P
                </Text>
                <TextInput
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="0.00"
                  placeholderTextColor={colors.onPrimaryContainer + "66"}
                  keyboardType="decimal-pad"
                  className="text-on-primary-container/40 font-bold text-6xl w-48 text-center p-0"
                />
              </View>
            </View>

            <View className="gap-2 mt-6">
              <Text className="text-primary font-medium">Note (optional)</Text>

              <View className="bg-surface-variant rounded-lg px-2">
                <TextInput
                  value={notes}
                  onChangeText={setNotes}
                  placeholder="Add a note"
                  placeholderTextColor={colors.outline}
                />
              </View>
            </View>

            <Pressable
              onPress={handleConfirm}
              disabled={!canConfirm || settlement.isPending}
              className="bg-primary rounded-full py-4 items-center mt-6 active:opacity-70 disabled:opacity-50"
            >
              {settlement.isPending ? (
                <ActivityIndicator color={colors.onPrimary} />
              ) : (
                <Text className="font-bold text-base text-on-primary">
                  Confirm payment
                </Text>
              )}
            </Pressable>
          </View>
        )}
      </View>
    </Modal>
  );
}
