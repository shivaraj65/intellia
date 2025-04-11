import React, { useState, useEffect, ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTheme } from "@/redux/reducers/appSlice";
import { RootState } from "@/redux/store";

interface ThemeWrapperProps {
  children: ReactNode;
}

const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
  const [appTheme, setAppTheme] = useState("light");

  const theme = useSelector((state: RootState) => state.app.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTheme: string | null = localStorage.getItem("appTheme");
    if (storedTheme) {
      dispatch(updateTheme(storedTheme));
      setAppTheme(storedTheme);
    }
  }, [theme]);

  return <div data-theme={appTheme}>{children}</div>;
};

export default ThemeWrapper;
