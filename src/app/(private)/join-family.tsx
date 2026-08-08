import { BlockButton } from "@/components/BlockButton";
import { InputField } from "@/components/InputField";
import { LoadingOverlay } from "@/components/LoadingOVerlay";
import { ModalHeader } from "@/components/ModalHeader";
import { familyService } from "@/services/family.services";
import { profileService } from "@/services/profile.services";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function JoinFamilyScreen() {
  const [inviteCode, setInviteCode] = useState("");
  const [nickname, setNickname] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const normalizedCode = inviteCode.trim().toUpperCase();

  useEffect(() => {
    profileService.getCurrentProfile().then(({ data }) => {
      if (data?.displayName) setNickname(data.displayName);
    });
  }, []);

  async function handleJoin() {
    if (!normalizedCode || !nickname.trim()) return;

    setSubmitting(true);
    const { data, error } = await familyService.joinFamily(
      normalizedCode,
      nickname.trim(),
    );
    setSubmitting(false);

    if (error) {
      Alert.alert("Join failed", error.message ?? "Something went wrong.");
      return;
    }

    if (!data) {
      Alert.alert("Join failed", "Something went wrong.");
      return;
    }

    router.replace(`/family/${data.id}`);
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="flex-1 px-8 py-4">
          <ModalHeader title="Join family" />

          <View className="flex-1 justify-center gap-6">
            <Text className="text-3xl font-bold text-text-primary">
              Join an existing family
            </Text>
            <Text className="text-sm text-text-secondary">
              Enter the invite code shared by your family, and set a nickname
              they will see you by.
            </Text>

            <InputField
              label="Invite code"
              text={inviteCode}
              onChangeText={(value) => setInviteCode(value.toUpperCase())}
              placeholder="e.g. ABC123"
            />

            <InputField
              label="Nickname"
              text={nickname}
              onChangeText={setNickname}
              placeholder="e.g. Nanay"
            />
          </View>

          <BlockButton
            text="Join family"
            onPress={handleJoin}
            disabled={!normalizedCode || !nickname.trim() || submitting}
          />
        </View>

        {submitting && <LoadingOverlay />}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}