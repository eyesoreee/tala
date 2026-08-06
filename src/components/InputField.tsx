import { colors } from "@/constants/colors";
import { Text, TextInput, View } from "react-native";

interface InputFieldProps {
  text?: string;
  onChangeText: (ch: string) => void;
  isPassword?: boolean;
  label?: string;
}

export function InputField({
  text,
  onChangeText,
  isPassword = false,
  label = "",
}: InputFieldProps) {
  return (
    <View className="w-full gap-2">
      {label && (
        <Text className="self-start text-sm text-primary">{label}</Text>
      )}
      <TextInput
        value={text}
        onChangeText={onChangeText}
        placeholder={isPassword ? "********" : "you@example.com"}
        placeholderTextColor={colors.textFaint}
        keyboardType="email-address"
        autoCapitalize="none"
        secureTextEntry={isPassword}
        autoCorrect={!isPassword}
        className="w-full bg-surface p-4 rounded-lg"
      />
    </View>
  );
}
