import { CATEGORIES } from "@/constants/categories";
import { Text, View } from "react-native";

interface CategoryChipProps {
  category: CATEGORIES;
}

export default function CategoryChip({ category }: CategoryChipProps) {
  return (
    <View className="bg-primary-container self-start py-1 px-2 rounded-full">
      <Text className="text-on-primary-container text-xs font-medium">
        {category}
      </Text>
    </View>
  );
}
