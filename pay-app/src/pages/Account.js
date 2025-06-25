import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts, fetchTransactions, setPage } from '../redux/slice/AccountSlice';
import { Table, Collapse, Pagination, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Account.css'; // Import the styles

//const { Panel } = Collapse;

export default function Accounts() {
  const dispatch = useDispatch();
  const { data, transactions, page, total, limit, loading } = useSelector((state) => state.accounts);
  const [expanded, setExpanded] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAccounts({ page, limit }));
  }, [dispatch, page, limit]);

  const handleExpand = async (expanded, record) => {
    if (expanded && !transactions[record.id]) {
      dispatch(fetchTransactions(record.id));
    }
    setExpanded((prev) =>
      expanded ? [...prev, record.id] : prev.filter((id) => id !== record.id)
    );
  };

  const columns = [
    { title: 'Account ID', dataIndex: 'id' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Balance', dataIndex: 'balance' },
  ];

  return (
    <div className='accounts-container'>
      <h2>Accounts</h2>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={data}
          expandable={{
            expandedRowRender: (record) => {
              const txns = transactions[record.id];
              return txns ? (
                <ul>
                  {txns.map(tx => (
                    <li key={tx.id}>
                      {tx.date}: {tx.amount} ({tx.type})
                    </li>
                  ))}
                </ul>
              ) : (
                <Spin />
              );
            },
            onExpand: handleExpand,
            expandedRowKeys: expanded,
          }}
          pagination={false}
          rowKey="id"
        />
      </Spin>
      <Pagination
        style={{ marginTop: 16 }}
        current={page}
        total={total}
        pageSize={limit}
        onChange={(p) => dispatch(setPage(p))}
      />
      <button onClick={()=>navigate("/editaccount")}>edit Account details</button>
    </div>
  );
}
