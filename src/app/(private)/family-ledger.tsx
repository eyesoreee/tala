import { BlockButton } from "@/components/BlockButton";
import { ActionCard } from "@/components/family-ledger/ActionCard";
import HeaderText from "@/components/family-ledger/HeaderText";
import MessageCard from "@/components/family-ledger/MessageCard";
import { colors } from "@/constants/colors";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FamilyLedgerScreen() {
  const { signOut } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="flex-1 px-8 py-6">
          <View className="flex-1 gap-4">
            <HeaderText
              title="Your family"
              subtitle="Create a shared ledger for your family, or join one that already exists."
            />

            <ActionCard
              icon="add"
              title="Create a family ledger"
              subtitle="Start a new shared ledger, and invite members"
              iconColor={colors.onPrimaryContainer}
              tileBg="bg-primary-container"
              iconSize={26}
              onPress={() => router.push("/create-family")}
            />

            <ActionCard
              icon="add"
              title="Join existing family"
              subtitle="Enter an invite code or scan a QR"
              iconColor={colors.onSecondaryContainer}
              iconSize={26}
              tileBg="bg-secondary-container"
              onPress={() => router.push("/join-family")}
            />

            <MessageCard
              title="One Family. One Ledger."
              subtitle="All expenses are shared automatically. Everyone always knows who paid and who owes whom."
            />
          </View>

          <BlockButton text="SIGNOUT" onPress={signOut} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
