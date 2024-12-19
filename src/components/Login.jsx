import React, { useState } from 'react';
import { getUsers } from '../services/allApi';


function Login({navigateToHome}) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' }); // Clear previous messages

    try {
      // Fetch all users to validate credentials
      const response = await getUsers();
      const users = response.data;
      const validUser = users.find(
        (user) =>
          user.username === formData.username &&
          user.password === formData.password
      );

      if (validUser) {
        setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
        setTimeout(() => navigateToHome(), 1500); // Redirect to home after a delay
      } else {
        setMessage({ text: 'Invalid username or password.', type: 'danger' });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ text: 'An error occurred. Please try again.', type: 'danger' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-white mt-5'>
      <div className="container d-flex justify-content-center align-items-center " style={{ minHeight: '70vh' }}>
        <div className="col-md-5 ">
          <div className="card shadow-lg border-0 rounded bg-white">
            <div className="card-body p-4">
              <h2 className="text-center mb-4 text-primary ">Login</h2>
              <form onSubmit={handleLogin}>
                {/* Username Input */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label text-secondary">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    className="form-control border"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
  
                {/* Password Input */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-secondary">Password</label>
                  <input
                    type="password"
                    id="password"
                     name="password"
                    placeholder="Enter your password"
                    className="form-control border"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
  
                {/* Login Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
                </div>
  
                 {/* Status Message */}
                 {message.text && (
                  <p className={(`mt-3 text-center text-${message.type}`)}>
                    {message.text}
                  </p>
                )}
  
                {/* Register Link */}
                <div className="text-center mt-3">
                  <p className="text-secondary">
                    Are you a new user?{' '}
                    <a href="/register" className="text-primary text-decoration-none">Register</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;