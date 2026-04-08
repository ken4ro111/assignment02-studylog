export const StudyRecordPreview = (props) => {
  const {text, value} = props;
  return (
    <div>
      <p>{text}: {value}</p>
    </div>
  )
}