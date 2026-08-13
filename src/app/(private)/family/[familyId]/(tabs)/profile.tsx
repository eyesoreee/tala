import EditNicknameModal from "@/components/profile/EditNicknameModal";
import FamilyInfoCard from "@/components/profile/FamilyInfoCard";
import MemberListItem from "@/components/profile/MemberListItem";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileMenuRow from "@/components/profile/ProfileMenuRow";
import { colors } from "@/constants/colors";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useGlobalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileTabScreen() {
  const { familyId } = useGlobalSearchParams<{ familyId: string }>();
  const { signOut } = useAuth();

  const {
    familyName,
    inviteCode,
    members,
    myMember,
    myMemberId,
    nickname,
    role,
    initials,
    loading,
    refreshing,
    refresh,
  } = useProfile(familyId);

  const [editModalVisible, setEditModalVisible] = useState(false);

  const onSignOut = useCallback(() => {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign out", style: "destructive", onPress: () => void signOut() },
    ]);
  }, [signOut]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-8 py-4 gap-8 pb-28"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      >
        <Text className="text-3xl font-bold text-on-background">Profile</Text>

        {loading ? (
          <View className="py-32 items-center justify-center">
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <>
            <ProfileHeader
              nickname={nickname}
              initials={initials}
              role={role}
            />

            <FamilyInfoCard familyName={familyName} inviteCode={inviteCode} />

            <View className="gap-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-on-background font-bold text-2xl">
                  Family members
                </Text>
                <View className="bg-primary-container rounded-full px-2.5 py-0.5">
                  <Text className="text-on-primary-container font-bold text-xs">
                    {members.length}
                  </Text>
                </View>
              </View>

              <View className="bg-surface rounded-2xl p-6 gap-4">
                {members.map((member, index) => (
                  <View key={member.id}>
                    {index > 0 && (
                      <View className="h-px bg-outline-variant/50 mb-4" />
                    )}
                    <MemberListItem
                      nickname={member.nickname}
                      role={member.role}
                      isMe={member.userId === myMember?.userId}
                    />
                  </View>
                ))}
              </View>
            </View>

            <View className="bg-surface rounded-2xl px-6 gap-2">
              <ProfileMenuRow
                icon="create-outline"
                label="Edit nickname"
                iconContainerClassName="bg-primary-container"
                iconColor={colors.onPrimaryContainer}
                onPress={() => setEditModalVisible(true)}
              />

              <View className="h-px bg-outline-variant/50" />

              <ProfileMenuRow
                icon="log-out-outline"
                label="Sign out"
                iconContainerClassName="bg-tint-red"
                iconColor={colors.negative}
                showChevron={false}
                onPress={onSignOut}
                textClassName="text-negative"
              />
            </View>
          </>
        )}
      </ScrollView>

      <EditNicknameModal
        key={editModalVisible ? `${myMemberId}-${nickname}` : "closed"}
        visible={editModalVisible}
        familyId={familyId}
        memberId={myMemberId}
        currentNickname={nickname}
        onClose={() => setEditModalVisible(false)}
      />
    </SafeAreaView>
  );
}
