import React from 'react';
import { Table as AntTable, Button, Pagination } from 'antd';
import './Table.css';

export default function Table({ columns, data, total, page, limit, onPageChange, onEdit, onDelete }) {
  const actionCol = {
    title: "Actions",
    render: (_, record) => (
      <div className="custom-table-actions">
        <Button type="link" onClick={() => onEdit(record)}>Edit</Button>
        <Button type="link" danger onClick={() => onDelete(record.id)}>Delete</Button>
      </div>
    )
  };

  return (
    <div className="custom-table-container">
      <AntTable
        columns={[...columns, actionCol]}
        dataSource={data}
        pagination={false}
        rowKey="id"
        loading={!data}
      />
      <div className="custom-pagination">
      <Pagination
        current={page}
        pageSize={limit}
        total={total}
        onChange={onPageChange}
        style={{ marginTop: 16 }}
      />
      </div>
    </div>
  );
}
