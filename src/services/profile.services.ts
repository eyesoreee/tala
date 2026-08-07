import { supabase } from "@/lib/supabase";

class ProfileService {
  async insert(displayName: string, photoUrl: string | null) {
    return supabase
      .from("profiles")
      .insert([{ displayName: displayName, photoUrl: photoUrl }]);
  }
}
