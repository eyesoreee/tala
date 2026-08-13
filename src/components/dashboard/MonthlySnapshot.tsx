import { View } from "react-native";
import SectionHeader from "./SectionHeader";
import SnapshotCard from "./SnapshotCard";

interface MonthlySnapshotProps {
  monthLabel: string;
  totalSpent: string;
  youPaid: string;
  youOwe: string;
  othersOweYou: string;
  onThisMonthPress?: () => void;
}

export default function MonthlySnapshot({
  monthLabel,
  totalSpent,
  youPaid,
  youOwe,
  othersOweYou,
  onThisMonthPress,
}: MonthlySnapshotProps) {
  return (
    <View className="gap-4">
      <SectionHeader
        title={monthLabel}
        actionLabel="This month"
        onPress={onThisMonthPress}
      />

      <View className="gap-2">
        <View className="flex-row gap-2">
          <SnapshotCard
            label="Total Spent"
            value={totalSpent}
            cardColor="bg-primary-container"
            textColor="text-on-primary-container"
          />

          <SnapshotCard
            label="You paid"
            value={youPaid}
            cardColor="bg-primary-container"
            textColor="text-on-primary-container"
          />
        </View>

        <View className="flex-row gap-2">
          <SnapshotCard
            label="You owe"
            value={youOwe}
            cardColor="bg-tint-red"
            textColor="text-negative"
          />

          <SnapshotCard
            label="Owed to you"
            value={othersOweYou}
            cardColor="bg-tint-blue"
            textColor="text-positive"
          />
        </View>
      </View>
    </View>
  );
}
