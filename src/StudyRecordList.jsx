import { useEffect, useState } from "react";
import { InputField } from "./components/InputField.jsx";
import { StudyRecordPreview } from "./components/StudyRecordPreview";
import { Button } from "./components/Button";
import { deleteStudyRecord, getAllStudyRecord, insertStudyRecord } from "./utils/supabaseFunctions.js";

export const StudyRecordList = () => {
  /**
   * @typedef {Object} StudyRecord
   * @property {string} id
   * @property {string} title
   * @property {number} time
   * @property {string} created_at
   */

  /** @type {StudyRecord[]} */
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

  const [loading, setLoading] = useState(true);

  const fetchStudyRecords = async () => {
    setLoading(true);

    try {
      const data = await getAllStudyRecord();

      setStudyRecords(data ?? []);
    } catch (error) {
      console.log(error);

      setStudyRecords([]);
    } finally {
      setLoading(false);
    }
  };

  // supabaseからデータを取得
  useEffect(() => {
    fetchStudyRecords();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudyRecord((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onClickAdd = async () => {
    if (studyRecord.time < 0) return;

    setError(false);

    if (studyRecord.title === "" || !studyRecord.time) {
      setError(true);

      return;
    };

    setLoading(true);

    try {
      await insertStudyRecord(studyRecord)

      await fetchStudyRecords();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    setStudyRecord({ title: "", time: 0});
  };

  const onClickDelete = async (id) => {
    setLoading(true);

    try {
      await deleteStudyRecord(id)

      await fetchStudyRecords();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setTotalTime(studyRecords.reduce((acc, current) => {
      return acc + parseInt(current.time);
    }, 0));
  }, [studyRecords]);

  // supabaseの読み込みが完了するまでローディングを表示
  if (loading) return <div>Loading...</div>;

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
            {studyRecords.map((record) => (
              <li key={record.id} style={{ display: "flex" }}>
                {record.title}：{record.time}
                <Button
                  title="削除"
                  onClick={() => onClickDelete(record.id)}
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