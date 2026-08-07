import { BlockButton } from "@/components/BlockButton";
import { InputField } from "@/components/InputField";
import { Logo } from "@/components/Logo";
import { EMAIL_REGEX } from "@/utils/validation";
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

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!EMAIL_REGEX.test(email.trim())) {
      Alert.alert("Enter a valid email address.");
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
          <Logo tagline="Reset your password" />

          <View className="w-full gap-y-4">
            <InputField
              label="Email Address"
              text={email}
              onChangeText={setEmail}
              type="email"
            />
            <BlockButton text="Send Reset Link" onPress={handleSubmit} />
          </View>

          <Pressable onPress={() => router.back()}>
            <Text className="text-sm font-semibold text-primary text-center">
              Back to Sign In
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
