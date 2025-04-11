import React from "react";
import styles from "@/styles/screens/highlightsScreen.module.scss";

const HighlightScreen = () => {
    return(
        <div className={styles.highlightsContainer}>            
            <h1 className="title">Intellia</h1>
            <h3 className="font1">test h1 title</h3>
            <p className="font2">test paragraph description</p>
        </div>
    )
}

export default React.memo(HighlightScreen);