import { AuthMode, AuthTabs } from "@/components/AuthTabs";
import { BlockButton } from "@/components/BlockButton";
import { InputField } from "@/components/InputField";
import { LabeledDivider } from "@/components/LabeledDivider";
import { LoadingOverlay } from "@/components/LoadingOVerlay";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { getAuthValidationError } from "@/utils/validation";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const [mode, setMode] = useState<AuthMode>("signIn");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isSignIn = mode === "signIn";

  const { submitting, signIn, signUp } = useAuth();

  const handleSubmit = () => {
    const validationError = getAuthValidationError(mode, {
      email,
      password,
      displayName,
    });

    if (validationError) {
      Alert.alert(validationError);
      return;
    }

    isSignIn ? signIn(email, password) : signUp(email, password, displayName);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerClassName="flex-grow px-8 py-6 items-center justify-center gap-y-8"
          keyboardShouldPersistTaps="handled"
        >
          <Logo tagline="Your shared family expense books" />

          <View className="w-full gap-y-6">
            <AuthTabs mode={mode} onChange={setMode} />

            <View className="w-full gap-y-4">
              {!isSignIn && (
                <InputField
                  label="Display Name"
                  text={displayName}
                  onChangeText={setDisplayName}
                  placeholder="Juan Dela Cruz"
                />
              )}

              <InputField
                label="Email Address"
                text={email}
                onChangeText={setEmail}
                type="email"
              />

              <InputField
                label="Password"
                text={password}
                onChangeText={setPassword}
                type="password"
              />

              {isSignIn && (
                <Pressable
                  className="self-end"
                  onPress={() => router.push("/forgot-password")}
                >
                  <Text className="text-sm font-semibold text-primary">
                    Forgot Password?
                  </Text>
                </Pressable>
              )}
            </View>

            <View className="w-full gap-y-4">
              <BlockButton
                text={isSignIn ? "Sign In" : "Create Account"}
                onPress={handleSubmit}
              />
              <LabeledDivider text="or" />
              <BlockButton text="Continue with Google" variant="secondary" />
            </View>
          </View>

          {submitting && <LoadingOverlay />}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
