import styles from './InputWithIcon.module.css';

export default function InputWithIcon({
  iconComponent,
  clickFunction,
  ...rest
}) {
  console.log(rest);
  return (
    <div className={styles.wrapper}>
      <input type='button' onClick={() => clickFunction()} {...rest} />
      <div className={styles.icon}>{iconComponent}</div>
    </div>
  );
}
