import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../axios';

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [viewUser, setViewUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({
    userName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    description: '',
  });

  // Fetch all users
  const getAllUsers = async () => {
    try {
      const res = await api.get('/getAlluser');
      setUsers(res.data.allUser);
    } catch (err) {
      console.error('Fetch failed:', err.response?.data || err.message);
      toast.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Delete user
  const handleDelete = async id => {
    try {
      await api.delete(`/getDeleteuser/${id}`);
      setUsers(prev => prev.filter(user => user._id !== id));
      toast.success('User deleted successfully');
    } catch (err) {
      console.error('Delete failed:', err.response?.data || err.message);
      toast.error('Delete failed');
    }
  };

  // View user
  const handleView = user => setViewUser(user);
  const closeView = () => setViewUser(null);

  // Edit user
  const handleEdit = user => {
    setEditUser(user);
    setEditForm({
      userName: user.userName || '',
      email: user.email || '',
      password: user.password || '',
      dateOfBirth: user.dateOfBirth || '',
      description: user.description || '',
    });
  };

  const handleEditChange = e => {
    setEditForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditSubmit = async e => {
    e.preventDefault();
    if (!editUser) return;

    try {
      const res = await api.put(`/getUpdateuser/${editUser._id}`, editForm);
      const updatedUser = res.data.updatedUser || res.data;

      // Update the users state
      setUsers(prev =>
        prev.map(user => (user._id === editUser._id ? updatedUser : user))
      );

      toast.success('User updated successfully');

      // Close edit modal
      setEditUser(null);
    } catch (err) {
      console.error('Update failed:', err.response?.data || err.message);
      toast.error('Update failed');
    }
  };

  return (
    <div>
      <h3 className="text-4xl text-center font-bold p-5">View All Users</h3>

      <div className="max-w-7xl mx-auto mt-10 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={user._id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <div className="mb-4">
                <p>
                  <span className="font-semibold">#</span> {index + 1}
                </p>
                <p>
                  <span className="font-semibold">User Name:</span>{' '}
                  {user.userName}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p>
                  <span className="font-semibold">Password:</span>{' '}
                  {user.password}
                </p>
                <p>
                  <span className="font-semibold">Date of Birth:</span>{' '}
                  {user.dateOfBirth}
                </p>
                <p>
                  <span className="font-semibold">Description:</span>{' '}
                  {user.description}
                </p>
              </div>

              <div className="flex gap-5 mt-4">
                <button
                  onClick={() => handleEdit(user)}
                  className="px-3 py-1 cursor-pointer bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleView(user)}
                  className="px-3 py-1 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="px-3 py-1 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 font-semibold">
            No Users Found
          </p>
        )}

        {/* View Modal */}
        {viewUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 relative">
              <h2 className="text-xl font-bold mb-4">View User</h2>
              <p>
                <span className="font-semibold">User Name:</span>{' '}
                {viewUser.userName}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {viewUser.email}
              </p>
              <p>
                <span className="font-semibold">Password:</span>{' '}
                {viewUser.password}
              </p>
              <p>
                <span className="font-semibold">Date of Birth:</span>{' '}
                {viewUser.dateOfBirth}
              </p>
              <p>
                <span className="font-semibold">Description:</span>{' '}
                {viewUser.description}
              </p>
              <button
                onClick={closeView}
                className="mt-4 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 relative">
              <h2 className="text-xl font-bold mb-4">Edit User</h2>
              <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  name="userName"
                  value={editForm.userName}
                  onChange={handleEditChange}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="User Name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Email"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={editForm.password}
                  onChange={handleEditChange}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Password"
                  required
                />
                <input
                  type="date"
                  name="dateOfBirth"
                  value={editForm.dateOfBirth}
                  onChange={handleEditChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  className="w-full border px-3 py-2 rounded"
                  rows="3"
                  placeholder="Description"
                  required
                />
                <div className="flex justify-between mt-2">
                  <button
                    type="submit"
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditUser(null)}
                    className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUser;
