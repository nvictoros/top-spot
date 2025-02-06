import styles from './GenericError.module.css';

export const GenericError = () => {
  return (
    <div className={styles.error}>
      <h1>Uh oh!</h1>
      <p>Something has gone wrong, please try again</p>
    </div>
  );
};
