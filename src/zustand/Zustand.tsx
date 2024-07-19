import { create } from "zustand";

type Store = {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
};

const useStore = create<Store>((set) => ({
  isAuth: false,
  login: () => set(() => ({ isAuth: true })),
  logout: () => set(() => ({ isAuth: false })),
}));

export default useStore;
