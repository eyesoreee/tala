import { BlockButton } from "@/components/BlockButton";
import { ModalHeader } from "@/components/ModalHeader";
import { CATEGORIES } from "@/constants/categories";
import { colors } from "@/constants/colors";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Checkbox } from "expo-checkbox";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface DummyData {
  name: string;
  isCheck: boolean;
}

export default function AddExpenseScreen() {
  const categories = Object.values(CATEGORIES);
  const [selectedCategory, onSelectCategory] = useState<CATEGORIES>(
    CATEGORIES.ALL,
  );
  const [members, setMembers] = useState<DummyData[]>([]);
  const [selectedMember, onSelectMember] = useState<DummyData>(members[3]);

  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    setMembers([
      { name: "Dad", isCheck: false },
      { name: "Mom", isCheck: false },
      { name: "Me", isCheck: false },
      { name: "Brother", isCheck: false },
    ]);

    console.log(selectedMember);
  }, []);

  const toggleMember = (name: string) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.name === name ? { ...member, isCheck: !member.isCheck } : member,
      ),
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-8 py-4 gap-6"
          showsVerticalScrollIndicator={false}
        >
          <ModalHeader title="Add expense" />

          <View className="bg-primary-container rounded-2xl items-center justify-center p-8 gap-4">
            <Text className="text-on-primary-container/60 text-md">Amount</Text>

            <View className="flex-row items-center gap-6">
              <Text className="font-bold text-2xl text-on-primary-container">
                P
              </Text>
              <Text className="text-on-primary-container/40 font-bold text-6xl">
                0.00
              </Text>
            </View>
          </View>

          <View className="gap-2">
            <Text className="text-primary font-medium">Title</Text>

            <View className="bg-surface rounded-lg px-2">
              <TextInput placeholder="What was this for?" />
            </View>
          </View>

          <View className="gap-2">
            <Text className="text-primary font-medium">Category</Text>

            <View className="flex-row flex-wrap gap-3">
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
            </View>
          </View>

          <View className="gap-2">
            <Text className="text-primary font-medium">Paid by</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="gap-4"
            >
              {members.map((member, idx) => {
                const isSelected = members[idx] === selectedMember;

                return (
                  <Pressable
                    key={idx}
                    className="items-center gap-1 active:opacity-70"
                    onPress={() => {
                      onSelectMember(member);
                    }}
                  >
                    <View
                      className={`${isSelected ? "border-2 border-primary" : ""} bg-primary-container rounded-full w-12 h-12 items-center justify-center`}
                    >
                      <Text className="font-bold text-on-primary-container">
                        {member.name[0]}
                      </Text>
                    </View>
                    <Text
                      className={`${isSelected ? "text-primary font-semibold" : "text-on-background/80"}`}
                    >
                      {member.name}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>

          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-on-background font-bold">
                Reimbursement
              </Text>
              <Text className="text-text-faint text-xs">
                Split this expense with family
              </Text>
            </View>

            <View className="flex-row bg-primary-container py-1 px-1 rounded-full">
              <Pressable
                className={`${!isEnabled ? "bg-surface rounded-full" : ""} py-1 px-3`}
                onPress={() => setIsEnabled(!isEnabled)}
              >
                <Text className="text-primary">No</Text>
              </Pressable>
              <Pressable
                className={`${isEnabled ? "bg-surface rounded-full" : ""} py-1 px-3`}
                onPress={() => setIsEnabled(!isEnabled)}
              >
                <Text className="text-primary">Yes</Text>
              </Pressable>
            </View>
          </View>

          {/* by default, all member are beneficiaries once reimbursement enabled 
        unless explicitly uncheck */}
          {isEnabled && (
            <View className="bg-surface-variant rounded-xl p-4 gap-3">
              <Text className="font-bold text-on-surface-variant">
                Who benefited?
              </Text>

              {members.map((member, idx) => {
                return (
                  <View key={idx} className="items-center gap-2 flex-row">
                    <Checkbox
                      value={member.isCheck}
                      onValueChange={() => toggleMember(member.name)}
                    />

                    <View className="bg-primary-container rounded-full w-12 h-12 items-center justify-center">
                      <Text className="font-bold text-on-primary-container">
                        {member.name[0]}
                      </Text>
                    </View>
                    <Text className="text-on-background font-medium">
                      {member.name}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}

          <View className="gap-2">
            <Text className="text-primary font-medium">Date</Text>
            <Pressable
              onPress={() => {}}
              className="active:opacity-70 flex-row items-center justify-between bg-surface p-4 rounded-xl"
            >
              <View className="flex-row items-center gap-2">
                <Ionicons name="calendar" color={colors.primary} size={20} />
                <Text className="text-on-surface">August 3, 2026</Text>
              </View>

              <Ionicons
                name="chevron-down"
                color={colors.onSurface}
                size={20}
              />
            </Pressable>
          </View>

          <View className="gap-2">
            <View className="flex-row gap-2 items-center">
              <Text className="text-primary font-medium">Notes</Text>
              <Text className="text-text-faint text-sm">(optional)</Text>
            </View>

            <View className="bg-surface rounded-lg px-3 py-2 h-32">
              <TextInput
                placeholder="Add a little context"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                className="flex-1 text-text"
              />
            </View>
          </View>

          {/* not gonna implement this for now. no receipt feature. */}
          <View className="gap-2 mb-24">
            <View className="flex-row gap-2 items-center">
              <Text className="text-primary font-medium">Receipt</Text>
              <Text className="text-text-faint text-sm">(optional)</Text>
            </View>

            <Pressable className=" gap-2 bg-primary-container/60 border-2 border-primary/30 border-dashed rounded-xl p-4 flex-row items-center justify-center active:opacity-70">
              <Ionicons
                name="cloud-upload-outline"
                color={colors.onPrimaryContainer}
                size={20}
              />

              <Text className="text-on-primary-container font-bold">
                Upload photo
              </Text>
            </Pressable>
          </View>

          <BlockButton text="Save expense" onPress={() => {}} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
