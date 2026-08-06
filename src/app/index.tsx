import { AuthMode, AuthTabs } from "@/components/AuthTabs";
import { BlockButton } from "@/components/BlockButton";
import { InputField } from "@/components/InputField";
import { LabeledDivider } from "@/components/LabeledDivider";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>("signIn");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isSignIn = mode === "signIn";

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-8 py-4 items-center justify-center gap-y-6 bg-background">
        <View className="items-center gap-2 pb-4">
          <Text className="text-4xl font-bold">Tala</Text>
          <Text className="text-md text-slate-400">
            Your shared family expense book
          </Text>
        </View>

        <AuthTabs mode={mode} onChange={setMode} />

        <View className="w-full gap-y-4">
          {!isSignIn && (
            <InputField
              label="Display Name"
              text={displayName}
              onChangeText={setDisplayName}
            />
          )}

          <InputField
            label="Email Address"
            text={email}
            onChangeText={setEmail}
          />

          <InputField
            label="Password"
            text={password}
            onChangeText={setPassword}
            isPassword
          />

          {isSignIn && (
            <Pressable className="self-end">
              <Text className="text-sm text-primary font-bold">
                Forgot Password?
              </Text>
            </Pressable>
          )}
        </View>

        <BlockButton text={isSignIn ? "Sign in" : "Create Account"} />
        <LabeledDivider text="or continue with" />
        <BlockButton
          text="Google"
          bgColor="bg-surface"
          textColor="text-on-surface"
        />
      </View>
    </SafeAreaView>
  );
}
