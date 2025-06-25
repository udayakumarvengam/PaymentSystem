import React from 'react';
import { useForm } from 'react-hook-form';
import API from '../services/api';
import './AddPayment.css';

export default function AddPayment() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await API.post('/payments', data);
      alert('Payment added');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-payment-form">
      <input {...register('amount')} placeholder="Amount" />
      <input {...register('date')} type="date" />
      <input {...register('accountId')} placeholder="Account ID" />
      <button type="submit">Submit</button>
    </form>
  );
}
