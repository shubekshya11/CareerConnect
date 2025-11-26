"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '../../AdminHeader';
import JobForm from '../JobForm';

export default function CreateJobPage() {
  const router = useRouter();

  const handleCreated = (job) => {
    // After creation navigate back to list
    router.push('/admin/job-manager');
  };

  const handleSubmit = async (formData) => {
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create job');
      handleCreated(data);
    } catch (err) {
      console.error('Error creating job:', err);
      alert(err.message || 'Failed to create job');
    }
  };

  return (
    <>
      <AdminHeader />
      <section className="container mx-auto py-5">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Create New Job</h1>
        </div>
        <JobForm onSubmit={handleSubmit} />
      </section>
    </>
  );
}
