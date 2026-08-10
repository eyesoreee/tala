import { colors } from "@/constants/colors";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Pressable, TextInput, View } from "react-native";

interface SearchBarProps {
  searchQuery: string;
  onSearchQuery: (text: string) => void;
}

export default function SearchBar({
  searchQuery,
  onSearchQuery,
}: SearchBarProps) {
  return (
    <View className="flex-row items-center justify-center gap-1 bg-primary-container px-4 py-1 rounded-full">
      <Ionicons
        name="search"
        size={20}
        color={colors.onPrimaryContainer}
        style={{ opacity: 0.6 }}
      />

      <TextInput
        placeholder="Search expenses..."
        onChangeText={onSearchQuery}
        value={searchQuery}
        className="flex-1"
      />

      {searchQuery && (
        <Pressable
          className="active:opacity-70"
          onPress={() => onSearchQuery("")}
        >
          <Ionicons name="close" size={20} color={colors.onPrimaryContainer} />
        </Pressable>
      )}
    </View>
  );
}
