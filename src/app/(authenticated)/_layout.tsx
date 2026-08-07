// (authenticated)/_layout.tsx
import { useAuth } from "@/contexts/AuthContext";
import { router, Stack } from "expo-router";
import { useEffect } from "react";

export default function HomeLayout() {
  const { session, initializing } = useAuth();

  useEffect(() => {
    if (initializing) return;

    if (!session) {
      router.replace("/");
    }
  }, [initializing, session]);

  if (initializing) return null;
  if (!session) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
