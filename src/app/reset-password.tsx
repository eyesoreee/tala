import { BlockButton } from "@/components/BlockButton";
import { InputField } from "@/components/InputField";
import { Logo } from "@/components/Logo";
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

  const handleSubmit = () => {
    if (password.length < 6) {
      Alert.alert("Password must be at least 6 characters.");
      return;
    }
    Alert.alert("Coming soon", "Password reset is not available yet.");
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

          <Pressable onPress={() => router.back()}>
            <Text className="text-sm font-semibold text-text-muted text-center">
              Back
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
