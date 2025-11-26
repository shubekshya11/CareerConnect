"use client"
import React, { useState } from 'react';

export default function JobForm({ initialData = {}, onSubmit }) {
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        company: initialData.company || '',
        location: initialData.location || '',
        vacancy_qty: initialData.vacancy_qty || '',
        qualifications: initialData.qualifications || '',
        job_description: initialData.job_description || '',
        responsibilities: initialData.responsibilities || '',
        salary: initialData.salary || '',
        job_type: initialData.job_type || '',
        deadline: initialData.deadline || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    return (
        <form className="g-3" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">
                    Job Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="company" className="form-label">
                    Company
                </label>
                <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="location" className="form-label">
                    Location
                </label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="vacancy_qty" className="form-label">
                    Vacancy Quantity                </label>
                <input
                    type="number"
                    id="vacancy_qty"
                    name="vacancy_qty"
                    value={formData.vacancy_qty}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="qualifications" className="form-label">
                    Qualifications
                </label>
                <textarea
                    id="qualifications"
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    className="form-control"
                    rows="4"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="job_description" className="form-label">
                    Description
                </label>
                <textarea
                    id="job_description"
                    name="job_description"
                    value={formData.job_description}
                    onChange={handleChange}
                    className="form-control"
                    rows="4"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="responsibilities" className='form-label'>Responsibilities</label>
                <textarea
                    id="responsibilities"
                    name="responsibilities"
                    value={formData.responsibilities}
                    onChange={handleChange}
                    className="form-control"
                    rows="4"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="salary" className="form-label">
                    Salary
                </label>
                <input
                    type="text"
                    id="salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="job_type" className="form-label">
                    Job Type
                </label>
                <select
                    id="job_type"
                    name="job_type"
                    value={formData.job_type}
                    onChange={handleChange}
                    className="form-select"
                >
                    <option value="">Select Type</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="deadline">Deadline</label>
                <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    className="form-control"
                    value={formData.deadline}
                    onChange={(e) =>
                        setFormData((prev) => ({ ...prev, deadline: e.target.value }))
                    }
                />
            </div>


            <div className="mb-3">
                <button type="submit" className="btn btn-primary">
                    {initialData.id ? 'Update Job' : 'Create Job'}
                </button>
            </div>
        </form>
    );

}