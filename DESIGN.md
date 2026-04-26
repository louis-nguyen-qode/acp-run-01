# UI Design Rules

Ant Design is the only UI library. No custom CSS except what AntD's theme system cannot express. No Tailwind.

## Principles

- Generous whitespace — prefer more space over cramped layouts
- One primary action per screen (one `type="primary"` button visible at a time)
- Type scale: AntD's built-in scale only — no custom `font-size` values
- Loading, empty, and error states are required for every data view

## Tokens

All colors, spacing, typography, radii, and shadows live in `theme/tokens.ts`. That file is the single source of truth.

**Never use hardcoded values.** No `color: "#1890ff"`. No `padding: 16px` in inline styles or CSS modules. Use `token.colorPrimary`, `token.paddingMD`, etc.

AntD's `<ConfigProvider theme={{ token: ... }}>` in `app/layout.tsx` applies the tokens globally.

## Layout

Use AntD layout primitives only:

- `<Layout>`, `<Layout.Header>`, `<Layout.Content>`, `<Layout.Sider>` for page structure
- `<Row>` and `<Col>` for grid layouts
- `<Space>` for inline spacing between elements
- `<Flex>` when AntD's Space/Row/Col is not enough (AntD 5.10+)

No raw `div` with `display: flex` or `display: grid` as layout containers.

## Forms

- AntD `<Form>` + `<Form.Item>` for all forms
- AntD validation rules on `<Form.Item>` for client-side validation
- Mirror validation with a Zod schema in the Server Action
- Use `components/ui/Form.tsx` wrapper (it enforces the standard layout)

## Tables

- AntD `<Table>` with typed columns
- Always provide `loading`, empty state (`locale.emptyText`), and error state
- Pagination via AntD's built-in `pagination` prop

## Modals

- `Modal.useModal()` hook for all programmatic modals
- `Modal.confirm()` only for destructive confirmations (delete, irreversible actions)
- Never stack modals

## Icons

- `@ant-design/icons` only
- No emoji as UI ornament — emoji is for content only
- Icon sizes follow AntD's `size` prop conventions

## Forbidden

- Gradients (unless defined as a named token in `theme/tokens.ts` for brand use)
- Box shadows beyond AntD's `boxShadow` token values
- CSS animations > 200ms (AntD's built-in transitions are fine)
- More than 2 typefaces on a page (AntD default + monospace for code)
- `style={{ color: '...' }}` or `style={{ padding: '...' }}` — use tokens

## Required States

Every list, table, or data fetch must implement:

- **Loading:** AntD `<Skeleton>` (not `<Spin>` alone — skeleton matches layout)
- **Empty:** AntD `<Empty>` with descriptive text and optional action
- **Error:** error message with a retry button
