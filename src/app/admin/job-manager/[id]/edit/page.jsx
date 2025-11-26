"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminHeader from '../../../AdminHeader';
import JobForm from '../../JobForm';

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchJob = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/jobs/${id}`, { credentials: 'include' });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch job');
        setInitialData(data);
      } catch (err) {
        setError(err.message || 'Failed to load job');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update job');
      router.push('/admin/job-manager');
    } catch (err) {
      console.error('Error updating job:', err);
      alert(err.message || 'Failed to update job');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <>
      <AdminHeader />
      <section className="container mx-auto py-5">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Edit Job</h1>
        </div>
        <JobForm initialData={initialData} onSubmit={handleSubmit} />
      </section>
    </>
  );
}
