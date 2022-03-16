import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { db } from '../firebase.config';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { name, email, password } = formData;

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

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const user = userCredential.user;

            updateProfile(auth.currentUser, {
                displayName: name,
            });

            const formDataCopy = {
                ...formData
            };
            delete formDataCopy.password;
            formDataCopy.timeStamp = serverTimestamp();

            await setDoc(doc(db, 'users', user.uid), formDataCopy);

            navigate('/');
        } catch (error) {
            toast.error('Something went wrong with registration');
        }
    };

    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome !</p>
                </header>

                <form onSubmit={onSubmit}>
                    <input
                        type='name'
                        className='nameInput'
                        id='name'
                        placeholder='name'
                        value={name}
                        onChange={onChange}
                        autoComplete='use-name'
                    />
                    <input
                        type='email'
                        className='emailInput'
                        id='email'
                        placeholder='Email'
                        value={email}
                        onChange={onChange}
                        autoComplete='use-email'
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

                    <div className="signUpBar">
                        <p className="signUpText">
                            Sign Up
                        </p>
                        <button className="signUpButton">
                            <ArrowRightIcon fill="#fffff" width="34px" height="34px" />
                        </button>
                    </div>
                </form>
                <Link to='/sign-in' className='registerLink'>
                    Sign Up Instead
                </Link>
            </div>
        </>
    );
};

export default SignUp;