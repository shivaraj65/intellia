"use client";

import React from "react";
import HighlightScreen from '@/screens/highlightsScreen';
import styles from "@/styles/pages/highlights.module.scss";

const Highlights = () => {
    return(
        <div className={styles.highlightsApp}>
            <HighlightScreen />
        </div>
    )
}

export default React.memo(Highlights);