import { useEffect, useState } from "react";
import { InputField } from "./components/InputField.jsx";
import { StudyRecordPreview } from "./components/StudyRecordPreview";
import { Button } from "./components/Button";

export const StudyRecordList = () => {

  const [studyRecords, setStudyRecords] = useState([]);

  const [studyRecord, setStudyRecord] = useState({
    title: "",
    time: 0,
  });

  const [totalTime, setTotalTime] = useState(
    studyRecords.reduce((acc, current) => {
      return acc + parseInt(current.time);
    }, 0)
  );

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudyRecord((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onClickAdd = () => {
    if (studyRecord.time < 0) return;

    setError(false);

    if (studyRecord.title === "" || !studyRecord.time) {
      setError(true);

      return;
    };

    setStudyRecords([...studyRecords, { title: studyRecord.title, time: studyRecord.time }]);

    setStudyRecord({ title: "", time: 0});
  };

  const onClickDelete = (index) => {
    setStudyRecords(studyRecords.filter((record, i) => i !== index));
  }

  useEffect(() => {
    setTotalTime(studyRecords.reduce((acc, current) => {
      return acc + parseInt(current.time);
    }, 0));
  }, [studyRecords]);

  return (
    <>
      <h1>学習記録一覧</h1>
      <div>
        <InputField
          label="学習内容"
          name="title"
          type="text"
          value={studyRecord.title}
          onChange={handleChange}
        />
        <InputField
          label="学習時間 (h)"
          name="time"
          type="number"
          value={studyRecord.time}
          onChange={handleChange}
        />
        <Button
          title="登録"
          onClick={onClickAdd}
        />
        <StudyRecordPreview
          text="入力されている学習内容"
          value={studyRecord.title}
        />
        <StudyRecordPreview
          text="入力されている学習時間"
          value={`${studyRecord.time}時間`}
        />
        {error && <p style={{ color: "red" }}>入力されていない項目があります</p>}
        <div>
          <ul>
            {studyRecords.map((record, index) => (
              <li key={index} style={{ display: "flex" }}>
                {record.title}：{record.time}
                <Button
                  title="削除"
                  onClick={() => onClickDelete(index)}
                />
              </li>
            ))}
          </ul>
        </div>
        <p>{`合計時間: ${totalTime} / 1000(h)`}</p>
      </div>
    </>
  );
};