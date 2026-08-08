import DashboardHeader from "@/components/family/DashboardHeader";
import MonthlySnapshot from "@/components/family/MonthlySnapshot";
import RecentExpenses from "@/components/family/RecentExpenses";
import FloatingActionButton from "@/components/FloatingActionButton";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeTabScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-8 py-4 gap-8">
        <DashboardHeader nickname="Nickname" familyName="Name Family" />
        <MonthlySnapshot />
        <RecentExpenses />
      </View>

      <FloatingActionButton />
    </SafeAreaView>
  );
}
