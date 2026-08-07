import { LoadingOverlay } from "@/components/LoadingOVerlay";
import { useAuth } from "@/contexts/AuthContext";
import { Button, View } from "react-native";

export default function HomeScreen() {
  const { signOut, submitting } = useAuth();

  return (
    <View className="flex-1 items-center justify-center">
      <Button title="Sign Out" onPress={signOut} />

      {submitting && <LoadingOverlay />}
    </View>
  );
}
