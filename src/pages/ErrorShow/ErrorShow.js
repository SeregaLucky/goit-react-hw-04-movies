/* import - node_lodules */
import React from 'react';
/* import - CSS */
import styles from './ErrorShow.module.css';

/*
 * COMPONENT
 */
const ErrorShow = () => {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>Sorry, an error has occurred. Try later.</h3>
    </section>
  );
};

export default ErrorShow;
