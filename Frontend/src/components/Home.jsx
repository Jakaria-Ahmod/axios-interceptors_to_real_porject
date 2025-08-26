import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../axios'; // main axios instance

const CreateUser = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    description: '',
  });

  // -------------------------------
  // App load বা component mount এ initial accessToken set
  useEffect(() => {
    const initToken = async () => {
      if (!localStorage.getItem('accessToken')) {
        try {
          const res = await api.post('/refresh');
          if (res.data.accessToken) {
            localStorage.setItem('accessToken', res.data.accessToken);
            console.log('Initial Access Token set:', res.data.accessToken);
          }
        } catch (err) {
          console.error('Initial refresh failed:', err);
        }
      }
    };
    initToken();
  }, []);
  // -------------------------------

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!localStorage.getItem('accessToken')) {
      try {
        const res = await api.post('/refresh'); //
        if (res.data.accessToken) {
          localStorage.setItem('accessToken', res.data.accessToken);
          console.log('Initial Access Token:', res.data.accessToken);
        }
      } catch (err) {
        console.error('Initial refresh failed:', err);
        return;
      }
    }

    try {
      const res = await api.post('/create-user', formData);

      const { accessToken, refreshToken } = res.data;
      if (accessToken) localStorage.setItem('accessToken', accessToken);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);

      console.log('User created successfully!', res.data);

      toast.success('User create successfully');

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        dateOfBirth: '',
        description: '',
      });
    } catch (err) {
      toast.error('All Faeild Required');
      console.log('Error:', err.response?.data || err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          rows="3"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
