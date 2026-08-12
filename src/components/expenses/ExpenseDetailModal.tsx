import SettleModal from "@/components/balances/SettleModal";
import { CATEGORIES } from "@/constants/categories";
import { colors } from "@/constants/colors";
import { Expense } from "@/constants/expense";
import { FamilyMember } from "@/constants/family-member";
import { useAuth } from "@/contexts/AuthContext";
import { useExpenseShares } from "@/hooks/useExpenseShares";
import { useSettlements } from "@/hooks/useSettlements";
import { formatFullDate, formatNumber, getInitials } from "@/utils/format";
import { useGlobalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
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
  const { familyId } = useGlobalSearchParams<{ familyId: string }>();
  const { session } = useAuth();

  const { data: shares = [], isLoading } = useExpenseShares(expense?.id);
  const { data: settlements = [] } = useSettlements(familyId);

  const [settleVisible, setSettleVisible] = useState(false);

  const membersById = useMemo(
    () => new Map(members.map((member) => [member.id, member])),
    [members],
  );

  const myMemberId = useMemo(
    () =>
      members.find((member) => member.userId === session?.user.id)?.id ?? null,
    [members, session],
  );

  const payerId = expense?.paidByMemberId ?? "";
  const payerName = membersById.get(payerId)?.nickname ?? "Member";
  const payerMember = membersById.get(payerId) ?? null;

  const beneficiaryList = useMemo(() => {
    if (!expense) return [];

    const withPayer = shares.some((share) => share.memberId === payerId)
      ? shares.map((share) => share.memberId)
      : [payerId, ...shares.map((share) => share.memberId)];

    return withPayer;
  }, [expense, shares, payerId]);

  const shareAmount = useMemo(() => {
    if (!expense || shares.length === 0) return null;

    return Math.round(expense.amount / shares.length);
  }, [expense, shares]);

  const settledByMember = useMemo(() => {
    if (!expense) return new Map<string, number>();

    const settled = new Map<string, number>();

    for (const settlement of settlements) {
      if (settlement.toMemberId !== expense.paidByMemberId) continue;
      // Count both linked (this expense) and unlinked (general) settlements
      if (
        settlement.expenseId !== null &&
        settlement.expenseId !== expense.id
      ) {
        continue;
      }

      settled.set(
        settlement.fromMemberId,
        (settled.get(settlement.fromMemberId) ?? 0) + settlement.amount,
      );
    }

    return settled;
  }, [settlements, expense]);

  const remainingFor = (memberId: string): number | null => {
    if (!expense || memberId === payerId || shareAmount === null) return null;

    const settled = settledByMember.get(memberId) ?? 0;
    return Math.max(0, shareAmount - Math.round(settled));
  };

  const myRemaining = myMemberId ? remainingFor(myMemberId) : null;

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
              <View className="w-16 h-16 rounded-full bg-avatar-mint-dark items-center justify-center">
                <Text className="font-bold text-2xl text-text-avatar">
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
                      This expense wasn&apos;t shared.
                    </Text>
                  </View>
                ) : (
                  <View className="flex-row flex-wrap gap-2">
                    {beneficiaryList.map((memberId) => {
                      const isPayer = memberId === payerId;
                      const nickname =
                        membersById.get(memberId)?.nickname ?? "Member";
                      const remaining = remainingFor(memberId);
                      const isPartial =
                        remaining !== null &&
                        remaining > 0 &&
                        remaining < (shareAmount ?? 0);

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

                          {isPayer ? (
                            <Text className="text-xs font-bold text-positive">
                              Paid
                            </Text>
                          ) : remaining === 0 ? (
                            <Text className="text-xs font-bold text-positive">
                              Paid
                            </Text>
                          ) : isPartial ? (
                            <Text className="text-xs font-bold text-secondary">
                              Partially paid
                            </Text>
                          ) : null}
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>

              {!isLoading && shares.length > 0 && shareAmount !== null && (
                <View className="gap-3">
                  <Text className="font-bold text-base text-on-surface">
                    Debt summary
                  </Text>

                  <View className="bg-tint-sand rounded-2xl px-4 py-1">
                    {beneficiaryList
                      .filter((memberId) => memberId !== payerId)
                      .map((memberId) => {
                        const nickname =
                          membersById.get(memberId)?.nickname ?? "Member";
                        const remaining = remainingFor(memberId);
                        const settled =
                          (settledByMember.get(memberId) ?? 0) > 0
                            ? Math.round(settledByMember.get(memberId) ?? 0)
                            : 0;

                        if (remaining === null) return null;

                        return (
                          <View
                            key={memberId}
                            className="flex-row items-center justify-between py-3 gap-4"
                          >
                            <Text className="text-sm text-text-debt flex-1">
                              {remaining === 0 ? (
                                <>
                                  {nickname} has settled with {payerName}{" "}
                                  <Text className="text-positive font-bold">
                                    ✓
                                  </Text>
                                </>
                              ) : settled > 0 ? (
                                <>
                                  {nickname} has paid {payerName} P
                                  {formatNumber(settled)} —{" "}
                                  <Text className="font-bold text-text-debt-strong">
                                    P{formatNumber(remaining)} left
                                  </Text>
                                </>
                              ) : (
                                <>
                                  {nickname} owes {payerName}{" "}
                                  <Text className="font-bold text-text-debt-strong">
                                    P{formatNumber(remaining)}
                                  </Text>
                                </>
                              )}
                            </Text>

                            {memberId === myMemberId && remaining > 0 && (
                              <Pressable
                                onPress={() => setSettleVisible(true)}
                                className="bg-error-container rounded-full px-4 py-2 active:opacity-70"
                              >
                                <Text className="text-on-error-container font-bold text-xs">
                                  Settle
                                </Text>
                              </Pressable>
                            )}
                          </View>
                        );
                      })}
                  </View>
                </View>
              )}

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

            {payerMember && myMemberId && myRemaining !== null && (
              <SettleModal
                visible={settleVisible}
                familyId={familyId}
                myMemberId={myMemberId}
                member={payerMember}
                amountOwed={myRemaining}
                expenseId={expense.id}
                titlePrefix={expense.title}
                onClose={() => setSettleVisible(false)}
                onSettled={() => setSettleVisible(false)}
              />
            )}
          </View>
        )}
      </View>
    </Modal>
  );
}
