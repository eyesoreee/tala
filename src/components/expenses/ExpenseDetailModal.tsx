import { CATEGORIES } from "@/constants/categories";
import { colors } from "@/constants/colors";
import { Expense } from "@/constants/expense";
import { FamilyMember } from "@/constants/family-member";
import { useExpenseShares } from "@/hooks/useExpenseShares";
import { formatFullDate, formatNumber, getInitials } from "@/utils/format";
import { useMemo } from "react";
import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CategoryChip from "./CategoryChip";

interface ExpenseDetailModalProps {
  expense: Expense | null;
  members: FamilyMember[];
  onClose: () => void;
}

export default function ExpenseDetailModal({
  expense,
  members,
  onClose,
}: ExpenseDetailModalProps) {
  const insets = useSafeAreaInsets();

  const { data: shares = [], isLoading } = useExpenseShares(expense?.id);

  const membersById = useMemo(
    () => new Map(members.map((member) => [member.id, member])),
    [members],
  );

  const payerId = expense?.paidByMemberId ?? "";
  const payerName = membersById.get(payerId)?.nickname ?? "Member";

  const beneficiaryList = useMemo(() => {
    if (!expense) return [];

    const withPayer = shares.some((share) => share.memberId === payerId)
      ? shares.map((share) => share.memberId)
      : [payerId, ...shares.map((share) => share.memberId)];

    return withPayer;
  }, [expense, shares, payerId]);

  return (
    <Modal
      visible={!!expense}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        <Pressable
          className="absolute inset-0 bg-black/40"
          onPress={onClose}
          accessibilityLabel="Close expense details"
        />

        {expense && (
          <View
            className="bg-surface rounded-t-3xl px-6 pt-3"
            style={{ paddingBottom: Math.max(insets.bottom, 16) + 8 }}
          >
            <View className="self-center w-10 h-1 rounded-full bg-outline-variant mb-5" />

            <View className="flex-row items-center gap-4 pb-6">
              <View className="w-16 h-16 rounded-full bg-primary-container items-center justify-center">
                <Text className="font-bold text-2xl text-on-primary-container">
                  {getInitials(payerName)}
                </Text>
              </View>

              <View className="flex-1 mr-2">
                <Text
                  className="font-bold text-xl text-on-surface"
                  numberOfLines={1}
                >
                  {expense.title}
                </Text>

                <Text className="text-sm text-on-surface-variant mt-1">
                  {formatFullDate(new Date(expense.expenseDate))}
                </Text>

                <View className="mt-2">
                  <CategoryChip category={expense.category as CATEGORIES} />
                </View>
              </View>

              <Text className="font-bold text-2xl text-on-surface">
                P{formatNumber(expense.amount)}
              </Text>
            </View>

            <View className="h-px bg-outline-variant" />

            <View className="pt-5 pb-6 gap-6">
              <View className="gap-3">
                <Text className="font-bold text-base text-on-surface">
                  Paid by {payerName}
                </Text>

                {isLoading ? (
                  <View className="py-6 items-center justify-center">
                    <ActivityIndicator size="large" color={colors.primary} />
                  </View>
                ) : beneficiaryList.length === 0 ? (
                  <View className="bg-surface-chip rounded-2xl px-4 py-4">
                    <Text className="text-sm text-text-body">
                      {"This expense wasn't shared."}
                    </Text>
                  </View>
                ) : (
                  <View className="flex-row flex-wrap gap-2">
                    {beneficiaryList.map((memberId) => {
                      const nickname =
                        membersById.get(memberId)?.nickname ?? "Member";

                      return (
                        <View
                          key={memberId}
                          className="flex-row items-center gap-2 bg-surface-chip rounded-full pl-1.5 pr-3 py-1.5"
                        >
                          <View className="w-6 h-6 rounded-full bg-avatar-blue items-center justify-center">
                            <Text className="text-xs font-bold text-text-avatar">
                              {getInitials(nickname)}
                            </Text>
                          </View>

                          <Text className="text-sm font-medium text-on-surface">
                            {nickname}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>

              {expense.notes && (
                <View className="gap-3">
                  <Text className="font-bold text-base text-on-surface">
                    Notes
                  </Text>

                  <View className="bg-surface-chip rounded-2xl px-4 py-3">
                    <Text className="text-sm leading-5 text-text-body">
                      {expense.notes}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
}
