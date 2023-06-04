import { create } from "zustand";

interface State {
  loading: boolean;

  toggleLoading: () => void;
}

export const useStore = create<State>()((set) => ({
  loading: false,

  toggleLoading() {
    set((state) => ({ loading: !state.loading }));
  },
}));
