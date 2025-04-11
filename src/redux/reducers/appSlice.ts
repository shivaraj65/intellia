/**
 * this slice will contain application level data.
 * -> user infos
 */

import {  appInfotypes, upProvider } from "@/utils/types/appTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface app {
  appInfo: appInfotypes | null;
  upProvider: upProvider | null;
  theme: string;
}

const initialState: app = {
  appInfo:{
    name:"Intellia",
    logo:"https://picsum.photos/150/50",
    description:"Where Opinions Meet Intelligence.",
  },
  upProvider: null,
  theme: "light",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateUpProviderData(state, action: PayloadAction<upProvider>) {
      state.upProvider = action.payload;
    },
    updateTheme(state, action: PayloadAction<string>) {
      state.theme = action.payload;
    },

    // todoAdded(state, action: PayloadAction<{ id: number; text: string }>) {
    //   state.push({
    //     id: action.payload.id,
    //     text: action.payload.text,
    //     completed: false,
    //   });
    // },
    // todoToggled(state, action: PayloadAction<number>) {
    //   const todo = state.find((todo) => todo.id === action.payload);
    //   if (todo) {
    //     todo.completed = !todo.completed;
    //   }
    // },
  },
});

export const { updateUpProviderData, updateTheme } = appSlice.actions;
export default appSlice.reducer;
