/**
 * component for the empty content
 * when DApp is available and no content exists
 */

import React from "react";
import styles from './emptyContent.module.scss';

const NoContent = () => {
  return <div className="">NoContent screen</div>;
};

export default React.memo(NoContent);
