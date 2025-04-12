import React, { useState } from "react";
import styles from "@/styles/screens/highlightsScreen.module.scss";
import AppLayout from "@/layout/appLayout";

const HighlightScreen = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

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
      </AppLayout>
    </div>
  );
};



export default React.memo(HighlightScreen);
