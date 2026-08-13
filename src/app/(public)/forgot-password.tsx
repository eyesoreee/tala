import { Logo } from "@/components/Logo";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPasswordScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-8 py-6 justify-center gap-y-8">
        <Logo tagline="Reset your password" />

        <View className="w-full gap-y-2">
          <Text className="text-2xl font-bold text-text-primary">
            Coming soon
          </Text>
          <Text className="text-base text-text-secondary">
            Password reset isn&rsquo;t available yet. We&rsquo;ll let you know
            when it&rsquo;s ready.
          </Text>
        </View>

        <Pressable onPress={() => router.replace("/")}>
          <Text className="text-sm font-semibold text-primary text-center">
            Back to Sign In
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
