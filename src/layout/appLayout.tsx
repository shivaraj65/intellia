import React, { ReactNode, useState } from "react";
import styles from "@/styles/layouts/appLayout.module.scss";
import { Button, Drawer } from "antd";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

interface Props {
  children: ReactNode;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (value: boolean) => void;
  drawerComtent: React.ReactNode;
}

const AppLayout = ({
  children,
  isDrawerOpen,
  setIsDrawerOpen,
  drawerComtent,
}: Props) => {
  const appInfo = useSelector((state: RootState) => state.app.appInfo);

  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  const onClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className={styles.applayout}>
      <div>
        <div className={styles.header}>
          <Button            
            icon={isDrawerOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}            
            onClick={showDrawer}
          ></Button>
          <h3 className="title">{appInfo ? appInfo.name : ""}</h3>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
      <Drawer
        className={styles.drawer}
        title=<h3 className="title">{appInfo ? appInfo.name : ""}</h3>
        placement="right"
        closable={false}
        onClose={onClose}
        open={isDrawerOpen}
        getContainer={false}
      >
        {drawerComtent}
      </Drawer>
    </div>
  );
};

export default React.memo(AppLayout);
