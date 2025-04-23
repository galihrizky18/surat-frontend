import { create } from "zustand";

type userState = {
  userId: string;
  role: string;
};

type Action = {
  setUserID: (userId: userState["userId"]) => void;
  setRole: (role: userState["role"]) => void;
};

const useUserStore = create<userState & Action>((set) => ({
  userId: "",
  role: "",
  setUserID: (userId) => set(() => ({ userId: userId })),
  setRole: (role) => set(() => ({ role: role })),
}));

export default useUserStore;
