import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const onChange = (e) => {
    setEmail(e.target.value)
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Email was sent')
    } catch (error) {
      toast.error('Could not send reset email')
    }
  };

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>
          <main>
            <form action='' onSubmit={onSubmit}>
              <input
                type='email'
                className='emailInput'
                name=''
                id=''
                onChange={onChange}
                value={email}
              />
              <Link to='/sign-in' className='ForgotPasswordLink'>
                Sign-in
              </Link>

              <div className="signInBar">
                <div className="signInText">
                  Send Reset Link
                </div>
              </div>

              <button className="signInButton">
                <ArrowRightIcon fill='"ffffff' width='34px' height='34px' />
              </button>
            </form>

          </main>
        </p>
      </header>
    </div>
  );
};

export default ForgotPassword;