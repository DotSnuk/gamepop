import styles from './InputWithIcon.module.css';

export default function InputWithIcon({
  iconComponent,
  clickFunction,
  ...rest
}) {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type='button'
        onClick={() => clickFunction()}
        {...rest}
      />
      <div className={styles.icon}>{iconComponent}</div>
    </div>
  );
}
