# Admin Console Portfolio

React/TypeScriptで「UI基盤」と「データ層（取得・キャッシュ・エラー設計）」を示す管理画面テンプレートです。外部バックエンドは使わず、MSWで自己完結します。

## 技術スタック

- Vite + React + TypeScript
- Ant Design (antd)
- react-router-dom
- @tanstack/react-query
- MSW
- react-hook-form + zod
- Vitest + Testing Library
- Playwright
- ESLint + Prettier
- GitHub Actions

## 画面 / 機能

- `/users`
  - ユーザー一覧（antd Table）
  - 検索、ページング、ソート
  - URLSearchParams（q/page/pageSize/sortBy/sortDir）同期
  - Loading/Error/Empty 状態
- `/users/:id`
  - ユーザー詳細（Loading/Error）
- `/users/:id/edit`
  - RHF + zodのフォーム
  - 保存前確認モーダル
  - react-query mutation
  - 楽観更新 → 成功でinvalidate/update、失敗時ロールバック
  - 成功/失敗通知（antd notification）

## UI基盤

- `PageLayout`: Layout + Breadcrumb + ヘッダー構成
- `ApiErrorAlert`: APIエラー表示を共通化
- `useUsersSearchParams`: URL同期ロジックを共通化
- `useAppNotification`: 通知APIラッパー

## データ層

- `apiClient` 経由で `/api/users`, `/api/users/:id`, `PATCH /api/users/:id` を利用
- エラーは `HttpError` 型に統一
- MSWハンドラで検索/ページング/ソート・業務エラー（emailドメイン）を再現

## ローカル起動

```bash
npm install
npm run dev
```

## テスト

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```

## ルール

- default export 禁止（アプリコード）
- アロー関数中心
- ESLint準拠（warning/error 0）
- UIはantdを優先
