import { BlockButton } from "@/components/BlockButton";
import { InputField } from "@/components/InputField";
import { LoadingOverlay } from "@/components/LoadingOVerlay";
import { ModalHeader } from "@/components/ModalHeader";
import { familyService } from "@/services/family.services";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateFamilyScreen() {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const trimmedName = name.trim();

  async function handleCreate() {
    if (!trimmedName) return;

    setSubmitting(true);
    const { data, error } = await familyService.createFamily(trimmedName);
    setSubmitting(false);

    if (error) {
      Alert.alert("Create failed", error.message ?? "Something went wrong.");
      return;
    }

    if (!data) {
      Alert.alert("Create failed", "Something went wrong.");
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
          <ModalHeader title="Create family" />

          <View className="flex-1 justify-center gap-6">
            <View className="gap-2">
              <Text className="text-3xl font-bold text-text-primary">
                Start a shared ledger
              </Text>
              <Text className="text-sm text-text-secondary">
                Give your family a name. You will get an invite code to share
                with the rest of the family.
              </Text>
            </View>

            <InputField
              label="Family name"
              text={name}
              onChangeText={setName}
              placeholder="e.g. The Dela Cruz Family"
            />
          </View>

          <BlockButton
            text="Create family"
            onPress={handleCreate}
            disabled={!trimmedName || submitting}
          />
        </View>

        {submitting && <LoadingOverlay />}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
