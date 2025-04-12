import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface propTypes {
  accounts: Array<`0x${string}`>;
  contextAccounts: Array<`0x${string}`>;
  profileConnected: boolean;
}

const initialState: propTypes = {
  accounts: [],
  contextAccounts: [],
  profileConnected: false,
};

const upProvideSlice = createSlice({
  name: "upProvider",
  initialState,
  reducers: {
    setAccounts(state, action: PayloadAction<Array<`0x${string}`>>) {
      state.accounts = action.payload;
    },
    setContextAccounts(state, action: PayloadAction<Array<`0x${string}`>>) {
      state.contextAccounts = action.payload;
    },
    setProfileConnected(state, action: PayloadAction<boolean>) {
      state.profileConnected = action.payload;
    },
    clearAccounts(state) {
      state.accounts = [];
    },
    clearContextAccounts(state) {
      state.contextAccounts = [];
    },
    clearProfileConnected(state) {
      state.profileConnected = false;
    },
  },
});

export const {
  setAccounts,
  setContextAccounts,
  setProfileConnected,
  clearAccounts,
  clearContextAccounts,
  clearProfileConnected,
} = upProvideSlice.actions;

export default upProvideSlice.reducer;
