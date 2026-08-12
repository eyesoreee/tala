import { colors } from "@/constants/colors";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BalancesTabScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-8 py-4 gap-8 pb-28"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-3xl font-bold text-on-background">
            Balances
          </Text>

          <Pressable className="rounded-full bg-primary-container p-2 active:opacity-70">
            <Ionicons
              name="notifications-outline"
              color={colors.onPrimaryContainer}
              size={20}
            />
          </Pressable>
        </View>

        <View className="bg-primary-container p-8 rounded-3xl gap-3">
          <Text className="text-md text-text-secondary font-semibold">
            Your balance
          </Text>
          <Text className="text-4xl text-on-primary-container/70 font-bold">
            +P200
          </Text>
          <Text className="text-sm text-on-primary-container/70">
            You are owed a litte more than you owe
          </Text>
        </View>

        <View className="gap-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-on-background font-bold text-2xl">
              You owe
            </Text>
            <Text className="text-error font-bold">P750 total</Text>
          </View>

          <View className="bg-surface rounded-2xl p-6 gap-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="bg-primary-container w-12 h-12 rounded-full items-center justify-center">
                  <Text>M</Text>
                </View>
                <Text className="font-bold">Mom</Text>
              </View>

              <View className="flex-row items-center gap-3">
                <Text className="font-bold text-error">P500</Text>
                <Pressable
                  onPress={() => {}}
                  className="active:opacity-70 bg-error-container px-4 py-2 rounded-full items-center justify-center"
                >
                  <Text className="text-on-error-container font-bold">
                    Settle
                  </Text>
                </Pressable>
              </View>
            </View>

            <View className="h-px bg-outline-variant/50" />

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="bg-primary-container w-12 h-12 rounded-full items-center justify-center">
                  <Text>B</Text>
                </View>
                <Text className="font-bold">Brother</Text>
              </View>

              <View className="flex-row items-center gap-3">
                <Text className="font-bold text-error">P250</Text>
                <Pressable
                  onPress={() => {}}
                  className="active:opacity-70 bg-error-container px-4 py-2 rounded-full items-center justify-center"
                >
                  <Text className="text-on-error-container font-bold">
                    Settle
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <View className="gap-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-on-background font-bold text-2xl">
              Owe you
            </Text>
            <Text className="text-error font-bold">P550 total</Text>
          </View>

          <View className="bg-surface rounded-2xl p-6 gap-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="bg-primary-container w-12 h-12 rounded-full items-center justify-center">
                  <Text>S</Text>
                </View>
                <Text className="font-bold">Sister</Text>
              </View>

              <View className="flex-row items-center gap-3">
                <Text className="font-bold text-primary">P150</Text>
                <Pressable
                  onPress={() => {}}
                  className="active:opacity-70 bg-primary-container px-4 py-2 rounded-full items-center justify-center"
                >
                  <Text className="text-on-primary-container font-bold">
                    Remind
                  </Text>
                </Pressable>
              </View>
            </View>

            <View className="h-px bg-outline-variant/50" />

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="bg-primary-container w-12 h-12 rounded-full items-center justify-center">
                  <Text>B</Text>
                </View>
                <Text className="font-bold">Brother</Text>
              </View>

              <View className="flex-row items-center gap-3">
                <Text className="font-bold text-primary">P400</Text>
                <Pressable
                  onPress={() => {}}
                  className="active:opacity-70 bg-primary-container px-4 py-2 rounded-full items-center justify-center"
                >
                  <Text className="text-on-primary-container font-bold">
                    Remind
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <View className="flex-row items-center justify-center bg-primary-container/60 p-4 gap-2 rounded-2xl">
          <Ionicons
            name="checkmark-circle-outline"
            size={20}
            color={colors.primary}
          />
          <Text className="flex-1 text-primary/70">
            Balances update automatically when expenses are added
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
