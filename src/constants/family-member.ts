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
