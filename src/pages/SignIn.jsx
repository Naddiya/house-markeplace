import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {

      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (userCredential.user) {
        navigate('/');
      }
    } catch (error) {
      toast.error('Bad user Credentials');
    }

  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back !</p>
        </header>
        <form onSubmit={onSubmit}>
          <input
            type='email'
            className='emailInput'
            id='email'
            placeholder='Email'
            value={email}
            onChange={onChange}
            autoComplete='user-email'
          />
          <div className="passwordInputDiv">
            <input type={showPassword ? 'text' : 'password'}
              className="passwordInput"
              id="password"
              placeholder='Password'
              value={password}
              onChange={onChange}
              autoComplete='user-password'
            />
            <img
              className="showPassword"
              src={visibilityIcon}
              alt="show password"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
          <Link
            to='/forgot-password'
            className='forgotPasswordLink'
          >
            Forgot Password
          </Link>

          <div className="signInBar">
            <p className="signInText">
              Sign In
            </p>
            <button className="signInButton">
              <ArrowRightIcon fill="#fffff" width="34px" height="34px" />
            </button>
          </div>
        </form>

        {/* Google OAuth component*/}

        <Link to='/sign-up' className='registerLink'>
          Sign In Instead
        </Link>
      </div>
    </>
  );
};

export default SignIn;