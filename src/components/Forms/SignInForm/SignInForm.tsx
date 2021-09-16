import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { userActions } from '../../../store/actions';
import './SignInForm.css';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { getLoggedInState, getLoggingInState } from "../../../store/reducers";
import { useEffect } from "react";
import CustomSpinner from "../../Spinner/Spinner";

type Inputs = {
    username: string,
    password: string,
};


const SignInForm = ({handleNotification}: PropsType) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    
    const loggingIn = useSelector(state => getLoggingInState(state));
    const loggedIn = useSelector(state => getLoggedInState(state));
    const onSuccess = () => {
        handleNotification('success', 'Signin Success', '');
    }
    const onFailer = (error:string) => {
        handleNotification('error', 'Signin failed', error);
    }

    const onSubmit: SubmitHandler<Inputs> = (data:any) => {
        dispatch(userActions.login(data.username, data.password, onSuccess, onFailer));
    }

    return (
        <div className="signin-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="email" className="sr-only">Email</label>

                    <input
                        {...register("username", { required: true })}
                        type="text"
                        className="form-control" placeholder="Enter Username"
                    />
                    {errors.username?.type === 'required' && <span className="msg-valid">username is required</span>}
                </div>
                <div className="form-group ">
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input
                        {...register("password", { required: true })}
                        type='password'
                        className="form-control"
                        placeholder="Enter Password"
                    />
                    {errors.password?.type === 'required' && <span className='msg-valid'>password is required</span>}
                </div>
                <button className="btn btn-block login-btn mb-4" type="submit" disabled={loggingIn}>
                    {loggingIn && <CustomSpinner />}
                    {!loggingIn && 'Login'}
                </button>
            </form>
            <a href="#!" className="forgot-password-link">Forgot password?</a>
            <p className="login-card-footer-text mt-2">Don't have an account? <Link to="/register" className="text-reset">Register here</Link></p>
        </div>
    );
}

interface PropsType {
    handleNotification: (type: string, title: string, msg: string) => void;
}

export default SignInForm;
