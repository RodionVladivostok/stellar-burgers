import { FC, SyntheticEvent } from 'react';
import { LoginUI } from '@ui-pages';
import { login, setLoginSuccess } from '../../services/slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import { setCookie } from '../../utils/cookie';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../utils/useForm';
import { Preloader } from '@ui';

interface LoginFormData {
  email: string;
  password: string;
}

export const Login: FC = () => {
  const { values, handleChange } = useForm<LoginFormData>({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.auth.loading);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(login(values))
      .unwrap()
      .then((data) => {
        try {
          localStorage.setItem('refreshToken', data.refreshToken);
          setCookie('accessToken', data.accessToken);
        } catch (err) {
          return new Error('error');
        }
      })
      .then(() => dispatch(setLoginSuccess(true)))
      .then(() => navigate('/'));
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText=''
      email={values.email}
      setEmail={handleChange}
      password={values.password}
      setPassword={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
