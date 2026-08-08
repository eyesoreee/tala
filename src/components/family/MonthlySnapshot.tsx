import { View } from "react-native";
import SectionHeader from "./SectionHeader";
import SnapshotCard from "./SnapshotCard";

export default function MonthlySnapshot() {
  return (
    <View className="gap-4">
      <SectionHeader
        title="August Snapshot"
        actionLabel="This month"
        onPress={() => {}}
      />

      <View className="gap-2">
        <View className="flex-row gap-2">
          <SnapshotCard
            label="Total Spent"
            value="P18,540"
            cardColor="bg-primary-container"
            textColor="text-on-primary-container"
          />

          <SnapshotCard
            label="You paid"
            value="P6,200"
            cardColor="bg-primary-container"
            textColor="text-on-primary-container"
          />
        </View>

        <View className="flex-row gap-2">
          <SnapshotCard
            label="You owe"
            value="P950"
            cardColor="bg-primary-container"
            textColor="text-on-primary-container"
          />

          <SnapshotCard
            label="Owed to you"
            value="P1,400"
            cardColor="bg-primary-container"
            textColor="text-on-primary-container"
          />
        </View>
      </View>
    </View>
  );
}
