import { MemberRole } from "./enums";

export interface FamilyMember {
  id: string;
  familyId: string;
  userId: string;
  nickname: string;
  role: MemberRole;
  joinedAt: string;
  deletedAt: string | null;
}

export interface FamilyMemberDTO {
  id: string;
  name: string;
  inviteCode: string;
  role: MemberRole;
}
