/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import firebaseApp from "../../firebase";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const auth = getAuth(firebaseApp);
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Signed in 
      const user = userCredential.user;
      if (user) {
        navigate('/app')
      }
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing in", errorCode, errorMessage);
    }
  };

  return (
    <div className="container flex h-screen mx-auto min-h-full flex-1 ">
      <div>

      </div>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 lg:py-20 xl:py-24 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img
              className="h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-8 text-4xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-lg leading-6 text-gray-500">
              Not a member?{' '}
              <Link to="/signup" className="font-semibold text-lg text-indigo-600 hover:text-indigo-500">
                Signup
              </Link>
            </p>
          </div>

          <div className="mt-10">
            <div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md text-lg border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="password" className="block text-lg font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-5 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md text-lg border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <EyeSlashIcon className="h-6 w-6" /> : <EyeIcon className="h-6 w-6" />}
                  </button>
                </div>
              </div>

              {error && <div className="text-red-500 mt-3">{error}</div>}

              <div>
                <button
                  type="submit"
                  onClick={handleLogin}
                  className="flex w-full mt-10 justify-center h-12 rounded-md bg-indigo-600 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover py-24"
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  );
};

export default Auth;
