import { render, screen, waitFor } from '@testing-library/react';
import { StudyRecordList } from '../StudyRecordList';
import {
  getAllStudyRecord,
  insertStudyRecord,
  deleteStudyRecord
} from "../utils/supabaseFunctions.js";
import userEvent from '@testing-library/user-event';

jest.mock("../utils/supabaseFunctions.js", () => ({
  getAllStudyRecord: jest.fn(),
  insertStudyRecord: jest.fn(),
  deleteStudyRecord: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();

  // 基本のデフォルト

  getAllStudyRecord.mockResolvedValue([]);
  insertStudyRecord.mockResolvedValue([]);
  deleteStudyRecord.mockResolvedValue([]);
});


describe("StudyRecordList", () => {
  test("タイトルが表示されること", async() => {
    render(<StudyRecordList />);

    expect(
      await screen.findByRole("heading", { name: "学習記録一覧" })
    ).toBeInTheDocument();
  });

  test("登録した記録が一覧に表示されること", async() => {
    getAllStudyRecord.mockResolvedValue([
      { id: 1, title: "React", time: 2 },
    ]);

    render(<StudyRecordList />);

    expect(await screen.findByText("React：2")).toBeInTheDocument();
  });

  test("新規で学習記録が登録できること", async() => {
    const user = userEvent.setup();

    getAllStudyRecord
      .mockResolvedValueOnce([
        { id: 1, title: "React", time: 2 },
      ])
      .mockResolvedValueOnce([
        { id: 1, title: "React", time: 2 },
        { id: 2, title: "Jest", time: 3 },
      ]);

    render(<StudyRecordList />);

    // 初期表示
    await screen.findByRole("heading", { name: "学習記録一覧" });
    expect(screen.getAllByRole("listitem")).toHaveLength(1);

    // 登録処理
    await user.type(screen.getByRole("textbox"), "Jest");
    await user.clear(screen.getByRole("spinbutton"));
    await user.type(screen.getByRole("spinbutton"), "3");
    await user.click(screen.getByRole("button", { name: "登録" }));

    // 登録後の表示
    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(2);
    });
  });

  test("学習記録が削除できること", async() => {
    const user = userEvent.setup();

    getAllStudyRecord
      .mockResolvedValueOnce([
        { id: "1", title: "React", time: 2 },
        { id: "2", title: "Jest", time: 3 },
      ])
      .mockResolvedValueOnce([
        { id: "2", title: "Jest", time: 3 },
      ]);

    render(<StudyRecordList />);

    // 初期表示
    await screen.findByRole("heading", { name: "学習記録一覧" });
    expect(screen.getAllByRole("listitem")).toHaveLength(2);

    // 削除処理
    await user.click(screen.getAllByRole("button", { name: "削除" })[0]);

    // 削除後の表示
    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(1);
    });
    expect(deleteStudyRecord).toHaveBeenCalledWith("1");
  });

  test("validate 入力不足時にエラーが表示されること", async() => {
    const user = userEvent.setup();

    render(<StudyRecordList />);

    await screen.findByRole("heading", { name: "学習記録一覧" });
    await user.click(screen.getByRole("button", { name: "登録" }));

    expect(
      screen.getByText("入力されていない項目があります")
    ).toBeInTheDocument();
    expect(insertStudyRecord).not.toHaveBeenCalled();
  });
});