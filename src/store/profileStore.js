import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProfileStore = create(
  persist(
    (set) => ({
      profile: null, // Stores user profile data
      setProfile: (profile) => set({ profile }), // Updates entire profile
      updateProfile: (updatedFields) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updatedFields } : null,
        })), // ✅ Updates specific fields without replacing the whole profile
      clearProfile: () => set({ profile: null }), // Clears profile data
    }),
    { name: "profile-store" } // Persist state in local storage
  )
);

export default useProfileStore;
