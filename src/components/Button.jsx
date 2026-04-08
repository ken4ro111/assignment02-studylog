export const Button = (props) => {
  const { title, onClick } = props;

  return (
    <div>
      <button onClick={onClick}>{title}</button>
    </div>
  )
};