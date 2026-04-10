import styles from './css/Button.module.css';

export const Button = (props) => {
  const { title, onClick } = props;

  return (
    <div>
      <button
        onClick={onClick}
        className={styles.button}
      >{title}</button>
    </div>
  )
};