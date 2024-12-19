import React, { useState } from 'react';
import { getUsers, registerUser } from '../services/allApi';




function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState({ text: '', type: '' }); // Message with type (success/danger)
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setMessage({ text: '', type: '' }); // Clear any previous messages

    try {
      const existingUsers = await getUsers();
      const usernameExists = existingUsers.data.some(
        (user) => user.username === formData.username
      );

      if (usernameExists) {
        setMessage({ text: 'This username already exists. Please choose another.', type: 'danger' });
        setIsLoading(false);
        return;
      }
      const response = await registerUser(formData);
      if (response.status === 201) {
        setMessage({ text: 'Registration successful!', type: 'success' });
        setFormData({ username: '', password: '', email:'' }); // Clear form
      } else {
        setMessage({ text: 'Registration failed. Try again.', type: 'danger' });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ text: 'An error occurred. Please try again.', type: 'danger' });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  return (
   <div className='bg-white' style={{marginTop:"70px"}}>
      <div className="container  d-flex justify-content-center align-items-center " style={{ minHeight: '70vh' }}>
        <div className="col-md-5">
          <div className="card shadow-lg border-0 rounded bg-white">
            <div className="card-body p-4">
              <h2 className="text-center mb-4 text-primary">Register</h2>
              <form onSubmit={handleRegister}>
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
  
                 {/* Email Input */}
                 <div className="mb-3">
                  <label htmlFor="email" className="form-label text-secondary ">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="form-control border"
                    value={formData.email}
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
  
                {/* Register Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-block"  disabled={isLoading} >
                  {isLoading ? 'Registering...' : 'Register'}
  
                  </button>
                </div>
  
                 {/* Status Message */}
                 {message.text && (
                  <p className={(`mt-3 text-center text-${message.type}`)}>
                    {message.text}
                  </p>
                )}
  
                {/* Login Link */}
                <div className="text-center mt-3">
                  <p className="text-secondary">
                    Already have an account?{' '}
                    <a href="/login" className="text-primary text-decoration-none">Login</a>
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

export default Register;