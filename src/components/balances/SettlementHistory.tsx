import { colors } from "@/constants/colors";
import { FamilyMember } from "@/constants/family-member";
import { Settlement } from "@/constants/settlements";
import { useAuth } from "@/contexts/AuthContext";
import { formatNumber, getInitials } from "@/utils/format";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

const AVATAR_TONES = [
  "bg-avatar-green",
  "bg-avatar-warm",
  "bg-avatar-blue",
  "bg-avatar-pink",
  "bg-avatar-sand",
];

interface SettlementHistoryProps {
  settlements: Settlement[];
  members: FamilyMember[];
}

interface SettlementRow {
  settlement: Settlement;
  isMine: boolean;
  otherMember: FamilyMember;
}

export default function SettlementHistory({
  settlements,
  members,
}: SettlementHistoryProps) {
  const { session } = useAuth();
  const [expanded, setExpanded] = useState(false);

  const membersById = useMemo(
    () => new Map(members.map((member) => [member.id, member])),
    [members],
  );

  const myMemberId = useMemo(
    () =>
      members.find((member) => member.userId === session?.user.id)?.id ?? null,
    [members, session],
  );

  const rows = useMemo<SettlementRow[]>(() => {
    const sorted = [...settlements].sort(
      (a, b) =>
        new Date(b.settledAt).getTime() - new Date(a.settledAt).getTime(),
    );

    const result: SettlementRow[] = [];

    for (const settlement of sorted) {
      const fromMember = membersById.get(settlement.fromMemberId);
      const toMember = membersById.get(settlement.toMemberId);
      if (!fromMember || !toMember) continue;

      const isMine = settlement.fromMemberId === myMemberId;
      const otherMember = isMine ? toMember : fromMember;

      result.push({ settlement, isMine, otherMember });
    }

    return result;
  }, [settlements, membersById, myMemberId]);

  if (rows.length === 0) return null;

  return (
    <View className="gap-4">
      <Pressable
        onPress={() => setExpanded((prev) => !prev)}
        className="flex-row items-center justify-between active:opacity-70"
        accessibilityRole="button"
        accessibilityLabel={expanded ? "Hide settlements" : "Show settlements"}
      >
        <View className="flex-row items-center gap-2">
          <Text className="text-on-background font-bold text-2xl">
            Settlements
          </Text>
          <View className="bg-primary-container rounded-full px-2.5 py-0.5">
            <Text className="text-on-primary-container font-bold text-xs">
              {rows.length}
            </Text>
          </View>
        </View>

        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={20}
          color={colors.outline}
        />
      </Pressable>

      {expanded && (
        <View className="bg-surface rounded-2xl px-6 py-2">
          <FlatList
            data={rows}
            keyExtractor={(item) => item.settlement.id}
            scrollEnabled={false}
            nestedScrollEnabled
            ItemSeparatorComponent={() => (
              <View className="h-px bg-outline-variant/50" />
            )}
            renderItem={({ item }) => {
              const { settlement, isMine, otherMember } = item;
              const date = new Date(settlement.settledAt);
              const dateLabel = date.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              });

              return (
                <View className="flex-row items-center gap-3 py-3.5">
                  <View
                    className={`w-10 h-10 rounded-full items-center justify-center ${
                      AVATAR_TONES[
                        otherMember.nickname.length % AVATAR_TONES.length
                      ]
                    }`}
                  >
                    <Text className="font-bold text-text-avatar">
                      {getInitials(otherMember.nickname)}
                    </Text>
                  </View>

                  <View className="flex-1">
                    <Text
                      className="font-medium text-on-surface"
                      numberOfLines={1}
                    >
                      {isMine
                        ? `You paid ${otherMember.nickname}`
                        : `${otherMember.nickname} paid you`}
                    </Text>
                    <Text className="text-xs text-on-surface-variant mt-0.5">
                      {dateLabel}
                      {settlement.notes ? ` · ${settlement.notes}` : ""}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-2">
                    <Text
                      className={`font-bold ${
                        isMine ? "text-negative" : "text-positive"
                      }`}
                    >
                      P{formatNumber(settlement.amount)}
                    </Text>
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color={colors.positive}
                    />
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}
