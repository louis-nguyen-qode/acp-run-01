# Reference: Data Table

Use the `example-page` reference for simple card grids.
Use AntD `<Table>` for tabular data:

```tsx
import { Table, type TableColumnsType } from 'antd'

type Row = { id: string; name: string; status: 'active' | 'inactive' }

const columns: TableColumnsType<Row> = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
]

// Inside the component:
<Table
  rowKey="id"
  columns={columns}
  dataSource={rows}
  loading={isLoading}
  locale={{ emptyText: <Empty description="No rows found" /> }}
  pagination={{ pageSize: 20 }}
/>
```

Rules:
- Always `rowKey` by a stable unique field (not array index)
- Always provide `loading`, `locale.emptyText`
- Type `columns` with `TableColumnsType<YourRowType>`
- Wrap error state outside the table: show `<Alert type="error">` + retry button
