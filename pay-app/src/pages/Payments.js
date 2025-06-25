import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPayments, setPage } from '../redux/slice/PaymentSlice';
import Table from '../components/Table';
import { useNavigate } from 'react-router-dom';
import './payment.css'; // 
const Payments = () => {
  const dispatch = useDispatch();
  const { data, total, page, limit, loading } = useSelector((state) => state.payments);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPayments({ page, limit }));
  }, [dispatch, page, limit]);

  const columns = [
    { title: 'Amount', dataIndex: 'amount' },
    { title: 'Date', dataIndex: 'date' },
    { title: 'Account', dataIndex: ['Account', 'name'] },
  ];

  return (
    <div className="payments-container">
      <h2>Payments</h2>
      <Table
        columns={columns}
        data={data}
        total={total}
        page={page}
        limit={limit}
        onPageChange={(newPage) => dispatch(setPage(newPage))}
        onEdit={(row) => console.log("Edit:", row)}
        onDelete={(id) => console.log("Delete:", id)}
      />
      <button onClick={()=>navigate("/addpayment")}>Add payment</button>
    </div>
  );
};

export default Payments;
