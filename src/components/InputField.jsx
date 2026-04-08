export const InputField = ({ label, ...props }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        {...props}
      />
    </div>
  );
};