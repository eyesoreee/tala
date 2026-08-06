import { Pressable, Text, View } from "react-native";

export type AuthMode = "signIn" | "createAccount";

interface AuthTabsProps {
  mode: AuthMode;
  onChange: (mode: AuthMode) => void;
}

const TABS: { key: AuthMode; label: string }[] = [
  { key: "signIn", label: "Sign In" },
  { key: "createAccount", label: "Create Account" },
];

export function AuthTabs({ mode, onChange }: AuthTabsProps) {
  return (
    <View className="w-full flex-row bg-surface-chip rounded-xl p-1">
      {TABS.map((tab) => {
        const active = tab.key === mode;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            className={`flex-1 items-center py-2.5 rounded-lg ${
              active ? "bg-surface" : ""
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                active ? "text-primary" : "text-text-muted"
              }`}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
