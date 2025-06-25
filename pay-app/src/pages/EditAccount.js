import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';
import './EditAccount.css'; 

export default function EditAccount() {
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadAccount = async () => {
      const res = await API.get(`/accounts/${id}`);
      reset(res.data);
    };
    loadAccount();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await API.put(`/accounts/${id}`, data);
      alert('Account updated!');
      navigate('/accounts');
    } catch (err) {
      console.error(err);
      alert('Failed to update account');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="edit-account-form">
      <h2>Edit Account</h2>
      <input {...register('name')} placeholder="Account Name" />
      <input {...register('type')} placeholder="Type (e.g., Checking)" />
      <input {...register('balance')} type="number" placeholder="Balance" />
      <button type="submit">Update</button>
    </form>
  );
}
