import { CATEGORIES } from "@/constants/categories";
import { Pressable, ScrollView, Text, View } from "react-native";
import SearchBar from "./SearchBar";

interface SearchFilterSectionProps {
  searchQuery: string;
  onSearchQuery: (text: string) => void;
  selectedCategory: CATEGORIES;
  onSelectCategory: (category: CATEGORIES) => void;
}

export default function SearchFilterSection({
  searchQuery,
  onSearchQuery,
  selectedCategory = CATEGORIES.ALL,
  onSelectCategory,
}: SearchFilterSectionProps) {
  const categories = Object.values(CATEGORIES);

  return (
    <View className="gap-4">
      <SearchBar searchQuery={searchQuery} onSearchQuery={onSearchQuery} />

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
                className={`text-sm font-medium ${isSelected ? "text-on-primary" : "text-on-primary-container"}`}
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
