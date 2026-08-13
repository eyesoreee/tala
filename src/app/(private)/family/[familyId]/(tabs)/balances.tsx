import SettleModal from "@/components/balances/SettleModal";
import SettlementHistory from "@/components/balances/SettlementHistory";
import { colors } from "@/constants/colors";
import { FamilyMember } from "@/constants/family-member";
import { useBalances } from "@/hooks/useBalances";
import { useSettlements } from "@/hooks/useSettlements";
import { formatNumber, getInitials } from "@/utils/format";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useGlobalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AVATAR_TONES = [
  "bg-avatar-green",
  "bg-avatar-warm",
  "bg-avatar-blue",
  "bg-avatar-pink",
  "bg-avatar-sand",
];

interface OwingRowProps {
  member: FamilyMember;
  amount: number;
  buttonLabel: string;
  amountClassName: string;
  buttonClassName: string;
  buttonTextClassName: string;
  onPress: () => void;
}

function OwingRow({
  member,
  amount,
  buttonLabel,
  amountClassName,
  buttonClassName,
  buttonTextClassName,
  onPress,
}: OwingRowProps) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-3 flex-1 mr-3">
        <View
          className={`w-12 h-12 rounded-full items-center justify-center ${
            AVATAR_TONES[member.nickname.length % AVATAR_TONES.length]
          }`}
        >
          <Text className="font-bold text-text-avatar">
            {getInitials(member.nickname)}
          </Text>
        </View>
        <Text className="font-bold text-on-surface" numberOfLines={1}>
          {member.nickname}
        </Text>
      </View>

      <View className="flex-row items-center gap-3">
        <Text className={`font-bold ${amountClassName}`}>
          P{formatNumber(amount)}
        </Text>
        <Pressable
          onPress={onPress}
          className={`active:opacity-70 px-4 py-2 rounded-full items-center justify-center ${buttonClassName}`}
        >
          <Text className={`font-bold ${buttonTextClassName}`}>
            {buttonLabel}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function BalancesTabScreen() {
  const { familyId } = useGlobalSearchParams<{ familyId: string }>();

  const {
    members,
    myMemberId,
    youOwe,
    owedToYou,
    totalYouOwe,
    totalOwedToYou,
    netBalance,
    loading,
    refreshing,
    refetch,
  } = useBalances(familyId);

  const { data: settlements = [] } = useSettlements(familyId);

  const [settleTarget, setSettleTarget] = useState<{
    member: FamilyMember;
    amount: number;
  } | null>(null);

  const remind = useCallback((member: FamilyMember) => {
    Alert.alert(
      "Reminder sent",
      `${member.nickname} will be reminded about your balance.`,
    );
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-8 py-4 gap-8 pb-28"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refetch} />
        }
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-3xl font-bold text-on-background">
            Balances
          </Text>

          <Pressable
            onPress={() => {
              if (!netBalance) return;
              if (netBalance > 0) {
                Alert.alert(
                  "Owed to you",
                  `Family members owe you a total of P${formatNumber(
                    totalOwedToYou,
                  )}.`,
                );
              } else {
                Alert.alert(
                  "You owe",
                  `You owe a total of P${formatNumber(totalYouOwe)} across the family.`,
                );
              }
            }}
            className="rounded-full bg-primary-container p-2 active:opacity-70"
          >
            <Ionicons
              name="notifications-outline"
              color={colors.onPrimaryContainer}
              size={20}
            />
          </Pressable>
        </View>

        {loading ? (
          <View className="py-32 items-center justify-center">
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <>
            <View className="bg-primary-container p-8 rounded-3xl gap-3">
              <Text className="text-md text-text-secondary font-semibold">
                Your balance
              </Text>

              <Text
                className={`text-4xl font-bold ${
                  netBalance >= 0
                    ? "text-on-primary-container/70"
                    : "text-negative"
                }`}
              >
                {netBalance >= 0 ? "+" : "−"}P
                {formatNumber(Math.abs(netBalance))}
              </Text>

              <Text className="text-sm text-on-primary-container/70">
                {youOwe.length === 0 && owedToYou.length === 0
                  ? "You're all settled up!"
                  : netBalance >= 0
                    ? "You are owed a little more than you owe"
                    : "You owe a little more than you're owed"}
              </Text>
            </View>

            <View className="gap-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-on-background font-bold text-2xl">
                  You owe
                </Text>
                {totalYouOwe > 0 && (
                  <Text className="text-error font-bold">
                    P{formatNumber(totalYouOwe)} total
                  </Text>
                )}
              </View>

              <View className="bg-surface rounded-2xl p-6 gap-4">
                {youOwe.length === 0 ? (
                  <Text className="text-sm text-text-faint text-center py-2">
                    Nothing owed — you're all caught up.
                  </Text>
                ) : (
                  youOwe.map((row, index) => (
                    <View key={row.member.id}>
                      {index > 0 && (
                        <View className="h-px bg-outline-variant/50 mb-4" />
                      )}
                      <OwingRow
                        member={row.member}
                        amount={row.amount}
                        buttonLabel="Settle"
                        amountClassName="text-error"
                        buttonClassName="bg-error-container"
                        buttonTextClassName="text-on-error-container"
                        onPress={() =>
                          setSettleTarget({
                            member: row.member,
                            amount: row.amount,
                          })
                        }
                      />
                    </View>
                  ))
                )}
              </View>
            </View>

            <View className="gap-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-on-background font-bold text-2xl">
                  Owe you
                </Text>
                {totalOwedToYou > 0 && (
                  <Text className="text-error font-bold">
                    P{formatNumber(totalOwedToYou)} total
                  </Text>
                )}
              </View>

              <View className="bg-surface rounded-2xl p-6 gap-4">
                {owedToYou.length === 0 ? (
                  <Text className="text-sm text-text-faint text-center py-2">
                    No one owes you right now.
                  </Text>
                ) : (
                  owedToYou.map((row, index) => (
                    <View key={row.member.id}>
                      {index > 0 && (
                        <View className="h-px bg-outline-variant/50 mb-4" />
                      )}
                      <OwingRow
                        member={row.member}
                        amount={row.amount}
                        buttonLabel="Remind"
                        amountClassName="text-primary"
                        buttonClassName="bg-primary-container"
                        buttonTextClassName="text-on-primary-container"
                        onPress={() => remind(row.member)}
                      />
                    </View>
                  ))
                )}
              </View>
            </View>

            <View className="flex-row items-center justify-center bg-primary-container/60 p-4 gap-2 rounded-2xl">
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color={colors.primary}
              />
              <Text className="flex-1 text-primary/70">
                Balances update automatically when expenses are added
              </Text>
            </View>

            <SettlementHistory settlements={settlements} members={members} />

            {myMemberId && (
              <SettleModal
                key={
                  settleTarget
                    ? `${settleTarget.member.id}-${settleTarget.amount}`
                    : "closed"
                }
                visible={!!settleTarget}
                familyId={familyId}
                myMemberId={myMemberId}
                member={settleTarget?.member ?? null}
                amountOwed={settleTarget?.amount ?? 0}
                onClose={() => setSettleTarget(null)}
                onSettled={() => setSettleTarget(null)}
              />
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
