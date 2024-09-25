import { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../src/context/AuthContext'; 

const Login = () => {
  const router = useRouter();
  const { login } = useAuth(); 
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (values: { email: string; password: string }) => {

    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');


    if (storedUser.email === values.email && storedUser.password === values.password) {
      login(storedUser); 
      console.log('Login successful!');
      router.push('/');
    } else {
      setLoginError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {loginError && <p className="text-red-500">{loginError}</p>}
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
          })}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Field 
                  name="email" 
                  type="email" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" 
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Field 
                  name="password" 
                  type="password" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" 
                />
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
        <div className="mt-4 text-center">
          <p className="text-sm">Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={() => router.push('/register')}>Register here</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
