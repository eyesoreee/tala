import { colors } from "@/constants/colors";
import {
  Ionicons,
  IoniconsIconName,
} from "@react-native-vector-icons/ionicons";
import { Tabs } from "expo-router";

interface TabConfig {
  title: string;
  icon: IoniconsIconName;
  iconFocused: IoniconsIconName;
}

const TABS: Record<string, TabConfig> = {
  index: { title: "Home", icon: "home-outline", iconFocused: "home" },
  expenses: {
    title: "Expenses",
    icon: "receipt-outline",
    iconFocused: "receipt",
  },
  balances: {
    title: "Balances",
    icon: "wallet-outline",
    iconFocused: "wallet",
  },
  profile: {
    title: "Profile",
    icon: "person-circle-outline",
    iconFocused: "person-circle",
  },
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textInactive,
        tabBarStyle: { backgroundColor: colors.surfaceNav },
      }}
    >
      {Object.entries(TABS).map(([name, { title, icon, iconFocused }]) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? iconFocused : icon}
                size={size}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
