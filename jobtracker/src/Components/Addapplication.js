import React, { useState } from 'react';
import './Addapplication.css';

const ViewAllApplications = () => {
  const [applications, setApplications] = useState([]);
  const [newApp, setNewApp] = useState({
    company: '',
    role: '',
    status: 'Applied',
    date: '',
    link: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setNewApp({ ...newApp, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateApplication = (e) => {
    e.preventDefault();

    if (!newApp.company || !newApp.role || !newApp.date) {
      alert("Please fill in all required fields.");
      return;
    }

    if (isEditing) {
      const updatedApplications = [...applications];
      updatedApplications[editIndex] = newApp;
      setApplications(updatedApplications);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setApplications([...applications, newApp]);
    }

    setNewApp({ company: '', role: '', status: 'Applied', date: '', link: '' });
  };

  const handleEdit = (index) => {
    setNewApp(applications[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedApplications = applications.filter((_, i) => i !== index);
    setApplications(updatedApplications);
  };

  return (
    <div className="applications-container">
      <h2>Job Applications</h2>

      <form className="application-form" onSubmit={handleAddOrUpdateApplication}>
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={newApp.company}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={newApp.role}
          onChange={handleChange}
          required
        />
        <select name="status" value={newApp.status} onChange={handleChange}>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <input
          type="date"
          name="date"
          value={newApp.date}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="link"
          placeholder="Application Link"
          value={newApp.link}
          onChange={handleChange}
        />
        <button type="submit">{isEditing ? 'Update Application' : 'Add Application'}</button>
      </form>

      <div className="applications-list">
        {applications.length === 0 ? (
          <p>No applications yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Status</th>
                <th>Date</th>
                <th>Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={index}>
                  <td>{app.company}</td>
                  <td>{app.role}</td>
                  <td>{app.status}</td>
                  <td>{app.date}</td>
                  <td>
                    {app.link ? (
                      <a href={app.link} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)} style={{ marginLeft: '8px' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewAllApplications;
