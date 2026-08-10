import { CATEGORIES } from "@/constants/categories";
import { colors } from "@/constants/colors";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Pressable, ScrollView, Text, View } from "react-native";
import SearchBar from "./SearchBar";

interface SearchFilterSectionProps {
  searchQuery: string;
  onSearchQuery: (text: string) => void;
  onFilter: () => void;
  selectedCategory: CATEGORIES;
  onSelectCategory: (category: CATEGORIES) => void;
}

export default function SearchFilterSection({
  searchQuery,
  onSearchQuery,
  onFilter,
  selectedCategory = CATEGORIES.ALL,
  onSelectCategory,
}: SearchFilterSectionProps) {
  const categories = Object.values(CATEGORIES);

  return (
    <View className="gap-4">
      <View className="flex-row items-center gap-2">
        <View className="flex-1">
          <SearchBar searchQuery={searchQuery} onSearchQuery={onSearchQuery} />
        </View>

        <Pressable
          className="bg-primary-container p-3 rounded-2xl active:opacity-70 items-center justify-center"
          onPress={onFilter}
        >
          <Ionicons name="filter" size={20} color={colors.onPrimaryContainer} />
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-2 items-center"
      >
        {categories.map((category, idx) => {
          const isSelected = categories[idx] === selectedCategory;
          return (
            <Pressable
              key={category}
              className={`${isSelected ? "bg-primary" : "bg-primary-container"} rounded-full active:opacity-70 py-2 px-4 self-start`}
              onPress={() => onSelectCategory(category)}
            >
              <Text
                className={`${isSelected ? "text-on-primary" : "text-on-primary-container"}`}
              >
                {category}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
