import { Pressable, Text } from "react-native";

interface BlockButtonProps {
  text: string;
  bgColor?: string;
  textColor?: string;
}

export function BlockButton({
  text,
  bgColor = "bg-primary",
  textColor = "text-slate-50",
}: BlockButtonProps) {
  return (
    <Pressable className={`w-full items-center py-5 rounded-2xl ${bgColor}`}>
      <Text className={`text-md font-bold ${textColor}`}>{text}</Text>
    </Pressable>
  );
}
