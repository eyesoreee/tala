import { BlockButton } from "@/components/BlockButton";
import { InputField } from "@/components/InputField";
import { LoadingOverlay } from "@/components/LoadingOVerlay";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState("");
  const { completePasswordReset, signOut, submitting } = useAuth();

  const handleSubmit = async () => {
    if (password.length < 6) {
      Alert.alert("Password must be at least 6 characters.");
      return;
    }

    const success = await completePasswordReset(password);
    if (success) router.replace("/(authenticated)");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="flex-1 px-8 py-6 justify-center gap-y-8">
          <Logo tagline="Choose a new password" />

          <View className="w-full gap-y-4">
            <InputField
              label="New Password"
              text={password}
              onChangeText={setPassword}
              type="password"
            />
            <BlockButton text="Update Password" onPress={handleSubmit} />
          </View>

          <Pressable onPress={() => signOut()}>
            <Text className="text-sm font-semibold text-text-muted text-center">
              Cancel
            </Text>
          </Pressable>
        </View>

        {submitting && <LoadingOverlay />}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
