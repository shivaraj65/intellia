/**
 * this slice will contain application level data.
 * -> user infos
 */

import { appInfotypes } from "@/utils/types/appTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface app {
  appInfo: appInfotypes | null;
  theme: string;
}

const initialState: app = {
  appInfo: {
    name: "Intellia",
    logo: "https://picsum.photos/150/50",
    description: "Where Opinions Meet Intelligence.",
  },
  theme: "light",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateTheme(state, action: PayloadAction<string>) {
      state.theme = action.payload;
    },
  },
});

export const { updateTheme } = appSlice.actions;
export default appSlice.reducer;
