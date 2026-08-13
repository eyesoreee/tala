import { colors } from "@/constants/colors";
import { SHORT_MONTHS } from "@/utils/format";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Modal, Pressable, Text, View } from "react-native";

interface MonthYearPickerProps {
  visible: boolean;
  value: Date;
  onChange: (date: Date) => void;
  onClose: () => void;
}

export default function MonthYearPicker({
  visible,
  value,
  onChange,
  onClose,
}: MonthYearPickerProps) {
  const year = value.getFullYear();

  const changeYear = (offset: number) => {
    onChange(new Date(year + offset, value.getMonth(), 1));
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 items-center justify-center bg-black/30 px-8">
        <Pressable
          className="absolute inset-0"
          onPress={onClose}
          accessibilityLabel="Close month picker"
        />

        <View className="w-full bg-surface rounded-3xl p-6 gap-4">
          <View className="flex-row items-center justify-between">
            <Pressable
              onPress={() => changeYear(-1)}
              className="active:opacity-70 size-10 items-center justify-center rounded-full bg-surface-chip"
              hitSlop={8}
            >
              <Ionicons
                name="chevron-back"
                size={20}
                color={colors.onSurface}
              />
            </Pressable>

            <Text className="text-lg font-bold text-on-surface">{year}</Text>

            <Pressable
              onPress={() => changeYear(1)}
              className="active:opacity-70 size-10 items-center justify-center rounded-full bg-surface-chip"
              hitSlop={8}
            >
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.onSurface}
              />
            </Pressable>
          </View>

          <View className="flex-row flex-wrap">
            {SHORT_MONTHS.map((monthName, idx) => {
              const isSelected = idx === value.getMonth();
              return (
                <Pressable
                  key={monthName}
                  className={`${isSelected ? "bg-primary" : "bg-primary-container"} rounded-full py-2 w-1/4 items-center active:opacity-70`}
                  onPress={() => {
                    onChange(new Date(year, idx, 1));
                    onClose();
                  }}
                >
                  <Text
                    className={`text-sm font-medium ${isSelected ? "text-on-primary" : "text-on-primary-container"}`}
                  >
                    {monthName}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}
