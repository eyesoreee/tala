import { colors } from "@/constants/colors";
import { Text, TextInput, View } from "react-native";

type FieldType = "text" | "email" | "password";

interface InputFieldProps {
  label?: string;
  text?: string;
  onChangeText: (value: string) => void;
  type?: FieldType;
  placeholder?: string;
}

const KEYBOARD_TYPE: Record<FieldType, "default" | "email-address"> = {
  text: "default",
  email: "email-address",
  password: "default",
};

const DEFAULT_PLACEHOLDER: Record<FieldType, string> = {
  text: "",
  email: "you@example.com",
  password: "••••••••",
};

export function InputField({
  label,
  text,
  onChangeText,
  type = "text",
  placeholder,
}: InputFieldProps) {
  return (
    <View className="w-full gap-2">
      {label && (
        <Text className="self-start text-sm font-medium text-text-secondary">
          {label}
        </Text>
      )}
      <TextInput
        value={text}
        onChangeText={onChangeText}
        placeholder={placeholder ?? DEFAULT_PLACEHOLDER[type]}
        placeholderTextColor={colors.textFaint}
        keyboardType={KEYBOARD_TYPE[type]}
        autoCapitalize={type === "text" ? "words" : "none"}
        autoCorrect={false}
        secureTextEntry={type === "password"}
        className="w-full bg-surface border border-border text-text-primary p-4 rounded-xl"
      />
    </View>
  );
}
