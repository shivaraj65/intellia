import React, { useState } from "react";
import styles from "@/styles/screens/highlightsScreen.module.scss";
import AppLayout from "@/layout/appLayout";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const HighlightScreen = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

   const accounts = useSelector((state: RootState) => state.upProvider.accounts);

  const DrawerContents = (): React.ReactNode => {
    return (
        <div className={styles.drawerContent}>
            <p>content 123</p>
        </div>
    )
  }

  return (
    <div className={styles.highlightsContainer}>
      <AppLayout isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} drawerComtent = {<DrawerContents/>}>        
        <h3 className="font1">test h1 title</h3>
        <p className="font2">test paragraph description</p>
        {
         accounts?.length > 0 && accounts.map((item)=>{
            return <p>{item}</p>
          })
        }        
      </AppLayout>
    </div>
  );
};



export default React.memo(HighlightScreen);
