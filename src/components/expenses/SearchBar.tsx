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
    <View className="flex-row items-center justify-center gap-2 bg-surface border border-border px-4 py-3 rounded-full">
      <Ionicons name="search" size={20} color={colors.textMuted} />

      <TextInput
        placeholder="Search expenses..."
        placeholderTextColor={colors.textFaint}
        onChangeText={onSearchQuery}
        value={searchQuery}
        className="flex-1 text-text-primary"
      />

      {searchQuery && (
        <Pressable
          className="active:opacity-69"
          onPress={() => onSearchQuery("")}
        >
          <Ionicons name="close" size={20} color={colors.textMuted} />
        </Pressable>
      )}
    </View>
  );
}
