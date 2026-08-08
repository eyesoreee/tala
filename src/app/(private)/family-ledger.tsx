import { BlockButton } from "@/components/BlockButton";
import { ActionCard } from "@/components/family-ledger/ActionCard";
import { FamilyCard } from "@/components/family-ledger/FamilyCard";
import HeaderText from "@/components/family-ledger/HeaderText";
import MessageCard from "@/components/family-ledger/MessageCard";
import { colors } from "@/constants/colors";
import { FamilyMemberDTO } from "@/constants/family-member";
import { useAuth } from "@/contexts/AuthContext";
import { familyService } from "@/services/family.services";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FamilyLedgerScreen() {
  const { session, signOut } = useAuth();
  const [families, setFamilies] = useState<FamilyMemberDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFamilies = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    const { data } = await familyService.getUserFamilies(session.user.id);
    if (data) setFamilies(data);
    setLoading(false);
  }, [session]);

  useFocusEffect(
    useCallback(() => {
      loadFamilies();
    }, [loadFamilies]),
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-8 py-6"
          showsVerticalScrollIndicator={false}
        >
          <HeaderText
            title="Your family"
            subtitle="Open a shared ledger you belong to, create a new one, or join an existing family."
          />

          <View className="gap-4">
            {loading ? (
              <View className="py-16 items-center justify-center">
                <ActivityIndicator size="large" color={colors.primary} />
              </View>
            ) : families.length > 0 ? (
              <>
                <Text className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                  My families
                </Text>
                {families.map((family) => (
                  <FamilyCard
                    key={family.id}
                    name={family.name}
                    role={family.role}
                    onPress={() => router.push(`/family/${family.id}`)}
                  />
                ))}
              </>
            ) : (
              <MessageCard
                title="You're not in a family yet"
                subtitle="Start a shared ledger for your family, or join one that already exists."
              />
            )}
          </View>

          <View className="mt-6 gap-4">
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
          </View>

          <MessageCard
            title="One Family. One Ledger."
            subtitle="All expenses are shared automatically. Everyone always knows who paid and who owes whom."
          />

          <View className="mt-6">
            <BlockButton text="SIGNOUT" onPress={signOut} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
