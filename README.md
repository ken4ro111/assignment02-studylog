# Study Log

学習内容と学習時間を記録し、一覧表示と合計時間の確認ができる React + Vite 製の学習記録アプリです。データ保存には Supabase、ホスティングには Firebase Hosting を利用しています。

## 主な機能

- 学習内容と学習時間の登録
- 登録済み学習記録の一覧表示
- 学習記録の削除
- 合計学習時間の表示
- Jest + Testing Library によるコンポーネントテスト
- GitHub Actions による push / pull request 時の自動テスト

## 使用技術

- React 19
- Vite 8
- Supabase
- Firebase Hosting
- Jest
- Testing Library
- ESLint

## セットアップ

### 1. 依存関係をインストール

```bash
npm ci
```

### 2. 環境変数を設定

`.env.sample` を参考に `.env` を作成し、Supabase の接続情報を設定します。

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

### 3. 開発サーバーを起動

```bash
npm run dev
```

## Supabase テーブル

このアプリは `study-record` テーブルを利用します。少なくとも以下のカラムが必要です。

| カラム名 | 型 | 用途 |
| --- | --- | --- |
| `id` | text または uuid | レコード識別子 |
| `title` | text | 学習内容 |
| `time` | integer など | 学習時間 |
| `created_at` | timestamp | 作成日時 |

実装上は `getAllStudyRecord`, `insertStudyRecord`, `deleteStudyRecord` でこのテーブルを操作しています。

## 利用可能なコマンド

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm test
npm run test:watch
npm run test:coverage
```

## テスト

Jest と Testing Library を使って、主に以下を確認しています。

- タイトル表示
- 一覧表示
- 学習記録の登録
- 学習記録の削除
- バリデーションエラー表示

通常のテスト実行:

```bash
npm test
```

CI と同じ形で 1 プロセス実行したい場合:

```bash
npm test -- --runInBand
```

## CI

GitHub Actions の [test.yml](.github/workflows/test.yml) で、以下のタイミングで自動テストが実行されます。

- `push`
- `pull_request`

処理内容は次のとおりです。

1. リポジトリをチェックアウト
2. Node.js をセットアップ
3. `npm ci` を実行
4. `npm test -- --runInBand` を実行

## デプロイ

Firebase Hosting へのデプロイ設定は [.github/workflows/deploy.yml](.github/workflows/deploy.yml) にあります。現在は `workflow_dispatch` で手動実行する構成です。

デプロイ時には以下の GitHub Secrets が必要です。

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `FIREBASE_KEY`

本番ビルド:

```bash
npm run build
```

## ディレクトリ構成

```text
.
├── .github/workflows
│   ├── deploy.yml
│   └── test.yml
├── src
│   ├── components
│   ├── tests
│   └── utils
├── jest.config.cjs
└── package.json
```

## 補足

- UI のエントリーポイントは `src/main.jsx` です。
- 主要画面のロジックは `src/StudyRecordList.jsx` にまとまっています。
- Supabase 接続設定は `src/utils/supabase.js` にあります。
