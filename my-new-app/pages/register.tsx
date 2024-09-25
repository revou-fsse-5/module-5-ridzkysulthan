import { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../src/context/AuthContext'; 

const Register = () => {
  const router = useRouter();
  const [registerError, setRegisterError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (values: { email: string; password: string; username: string }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {

        localStorage.setItem('user', JSON.stringify(values));
        setIsRegistered(true);
        setRegisterError('');
      } else {
        setRegisterError(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setRegisterError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        {registerError && <p className="text-red-500">{registerError}</p>}
        
        {isRegistered ? (
          <div className="text-center">
            <p className="text-green-500">Registration successful! Please log in.</p>
            <button 
              onClick={() => router.push('/login')} 
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Go to Login
            </button>
          </div>
        ) : (
          <Formik
            initialValues={{ username: '', email: '', password: '' }}
            validationSchema={Yup.object({
              username: Yup.string().required('Required'),
              email: Yup.string().email('Invalid email address').required('Required'),
              password: Yup.string().required('Required'),
            })}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                  <Field name="username" type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                  <ErrorMessage name="username" component="div" className="text-red-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <Field name="email" type="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                  <ErrorMessage name="email" component="div" className="text-red-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <Field name="password" type="password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                  <ErrorMessage name="password" component="div" className="text-red-500" />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300">Register</button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default Register;
