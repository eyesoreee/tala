import { BlockButton } from "@/components/BlockButton";
import { LoadingOverlay } from "@/components/LoadingOVerlay";
import { ModalHeader } from "@/components/ModalHeader";
import { CATEGORIES } from "@/constants/categories";
import { colors } from "@/constants/colors";
import { Category } from "@/constants/enums";
import { useAuth } from "@/contexts/AuthContext";
import { useCreateExpense } from "@/hooks/useCreateExpense";
import { useFamilyMembers } from "@/hooks/useFamilyMembers";
import { formatFullDate } from "@/utils/format";
import DateTimePicker, {
  DateTimePickerChangeEvent,
} from "@react-native-community/datetimepicker";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Checkbox } from "expo-checkbox";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddExpenseScreen() {
  const { familyId } = useLocalSearchParams<{ familyId: string }>();
  const { session } = useAuth();

  const {
    data: members = [],
    isLoading: membersLoading,
    error: membersError,
  } = useFamilyMembers(familyId);

  const categories = useMemo(
    () => Object.values(CATEGORIES).filter((c) => c !== CATEGORIES.ALL),
    [],
  );

  const myMemberId =
    members.find((member) => member.userId === session?.user.id)?.id ?? null;
  const allMemberIds = useMemo(
    () => members.map((member) => member.id),
    [members],
  );

  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>(CATEGORIES.GROCERIES);
  const [paidByMemberId, setPaidByMemberId] = useState<string | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [beneficiaryIds, setBeneficiaryIds] = useState<string[] | null>(null);
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [notes, setNotes] = useState("");

  const createExpense = useCreateExpense();

  useEffect(() => {
    if (createExpense.isError) {
      Alert.alert(
        "Save failed",
        createExpense.error?.message ?? "Something went wrong.",
      );
    }
  }, [createExpense.isError, createExpense.error]);

  useEffect(() => {
    if (createExpense.isSuccess) {
      router.back();
    }
  }, [createExpense.isSuccess]);

  const payer = paidByMemberId ?? myMemberId;

  const toggleReimbursement = () => {
    setIsEnabled((prev) => !prev);
    setBeneficiaryIds(null);
  };

  const toggleBeneficiary = (memberId: string) => {
    setBeneficiaryIds((prev) => {
      const current = prev ?? allMemberIds;
      return current.includes(memberId)
        ? current.filter((id) => id !== memberId)
        : [...current, memberId];
    });
  };

  const isBeneficiary = (memberId: string) =>
    (beneficiaryIds ?? allMemberIds).includes(memberId);

  const onDateValueChange = (_event: DateTimePickerChangeEvent, date: Date) => {
    setExpenseDate(date);
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
  };

  const onDateDismiss = () => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
  };

  const amountValue = Number(amount);
  const canSave =
    title.trim().length > 0 &&
    Number.isFinite(amountValue) &&
    amountValue > 0 &&
    !!payer &&
    members.length > 0;

  const handleSave = () => {
    if (!canSave || !payer) return;

    createExpense.mutate({
      familyId,
      paidByMemberId: payer,
      title: title.trim(),
      amount: amountValue,
      category,
      expenseDate: expenseDate.toISOString(),
      reimbursementRequired: isEnabled,
      notes: notes.trim() || null,
      shareMemberIds: isEnabled ? (beneficiaryIds ?? allMemberIds) : [],
    });
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
            <Text className="text-on-primary-container/60 text-base">
              Amount
            </Text>

            <View className="flex-row items-center gap-6">
              <Text className="font-bold text-2xl text-on-primary-container">
                P
              </Text>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                placeholderTextColor={colors.onPrimaryContainer + "66"}
                keyboardType="decimal-pad"
                className="text-on-primary-container font-bold text-6xl w-48 text-center p-0"
              />
            </View>
          </View>

          <View className="gap-2">
            <Text className="text-primary font-medium">Title</Text>

            <View className="bg-surface border border-border rounded-xl px-4">
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="What was this for?"
                placeholderTextColor={colors.textFaint}
                className="py-3 text-text-primary"
              />
            </View>
          </View>

          <View className="gap-2">
            <Text className="text-primary font-medium">Category</Text>

            <View className="flex-row flex-wrap gap-3">
              {categories.map((item) => {
                const isSelected = item === category;
                return (
                  <Pressable
                    key={item}
                    className={`${isSelected ? "bg-primary" : "bg-primary-container"} rounded-full active:opacity-70 py-2 px-4 self-start`}
                    onPress={() => setCategory(item)}
                  >
                    <Text
                      className={`text-sm font-medium ${isSelected ? "text-on-primary" : "text-on-primary-container"}`}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View className="gap-2">
            <Text className="text-primary font-medium">Paid by</Text>

            {membersError && (
              <Text className="text-error text-sm">
                Could not load family members.
              </Text>
            )}

            {membersLoading ? (
              <View className="py-8 items-center justify-center">
                <ActivityIndicator size="small" color={colors.primary} />
              </View>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="gap-4"
              >
                {members.map((member) => {
                  const isSelected = member.id === payer;
                  return (
                    <Pressable
                      key={member.id}
                      className="items-center gap-1 active:opacity-70"
                      onPress={() => setPaidByMemberId(member.id)}
                    >
                      <View
                        className={`${isSelected ? "border-2 border-primary" : ""} bg-primary-container rounded-full w-12 h-12 items-center justify-center`}
                      >
                        <Text className="font-bold text-on-primary-container">
                          {member.nickname[0]}
                        </Text>
                      </View>
                      <Text
                        className={`text-sm ${isSelected ? "text-primary font-semibold" : "text-on-background/80"}`}
                      >
                        {member.nickname}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            )}
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
                onPress={toggleReimbursement}
              >
                <Text className="text-primary">No</Text>
              </Pressable>
              <Pressable
                className={`${isEnabled ? "bg-surface rounded-full" : ""} py-1 px-3`}
                onPress={toggleReimbursement}
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

              {members.map((member) => {
                return (
                  <View key={member.id} className="items-center gap-2 flex-row">
                    <Checkbox
                      value={isBeneficiary(member.id)}
                      onValueChange={() => toggleBeneficiary(member.id)}
                    />

                    <View className="bg-primary-container rounded-full w-12 h-12 items-center justify-center">
                      <Text className="font-bold text-on-primary-container">
                        {member.nickname[0]}
                      </Text>
                    </View>
                    <Text className="text-on-background font-medium">
                      {member.nickname}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}

          <View className="gap-2">
            <Text className="text-primary font-medium">Date</Text>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              className="active:opacity-70 flex-row items-center justify-between bg-surface border border-border p-4 rounded-xl"
            >
              <View className="flex-row items-center gap-2">
                <Ionicons name="calendar" color={colors.primary} size={20} />
                <Text className="text-on-surface">
                  {formatFullDate(expenseDate)}
                </Text>
              </View>

              <Ionicons
                name="chevron-down"
                color={colors.onSurface}
                size={20}
              />
            </Pressable>

            {showDatePicker && (
              <View>
                {Platform.OS === "ios" && (
                  <Pressable
                    onPress={() => setShowDatePicker(false)}
                    className="self-end py-1 px-2"
                  >
                    <Text className="text-primary font-semibold">Done</Text>
                  </Pressable>
                )}
                <DateTimePicker
                  value={expenseDate}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onValueChange={onDateValueChange}
                  onDismiss={onDateDismiss}
                />
              </View>
            )}
          </View>

          <View className="gap-2">
            <View className="flex-row gap-2 items-center">
              <Text className="text-primary font-medium">Notes</Text>
              <Text className="text-text-faint text-sm">(optional)</Text>
            </View>

            <View className="bg-surface border border-border rounded-xl px-4 py-3 h-32">
              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Add a little context"
                placeholderTextColor={colors.textFaint}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                className="flex-1 text-text-primary"
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

          <BlockButton
            text="Save expense"
            onPress={handleSave}
            disabled={!canSave || createExpense.isPending}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {createExpense.isPending && <LoadingOverlay />}
    </SafeAreaView>
  );
}
