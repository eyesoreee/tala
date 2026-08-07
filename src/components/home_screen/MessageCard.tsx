import { Text, View } from "react-native";

interface MessageCardProps {
  title: string;
  subtitle: string;
}

export default function MessageCard({ title, subtitle }: MessageCardProps) {
  return (
    <View className="w-full bg-primary-container/50 p-8 mt-4 gap-3 items-center justify-center rounded-2xl">
      <Text className="font-bold text-on-primary-container/50 text-center">
        {title}
      </Text>

      <Text className="text-sm text-on-primary-container/50 text-center">
        {subtitle}
      </Text>
    </View>
  );
}
