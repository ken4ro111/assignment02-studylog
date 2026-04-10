export const Button = (props) => {
  const { title, onClick } = props;

  return (
    <div>
      <button
        onClick={onClick}
        style={{ padding: "8px", margin: "4px", border: "none", borderRadius: "4px", color: "white", backgroundColor: "#00c395cd", cursor: "pointer" }}
      >{title}</button>
    </div>
  )
};