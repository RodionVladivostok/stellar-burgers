import { FC, SyntheticEvent } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { register } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../utils/useForm';
import { Preloader } from '@ui';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export const Register: FC = () => {
  const { values, handleChange } = useForm<RegisterFormData>({
    email: '',
    password: '',
    name: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.auth.loading);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(register(values)).then(() => navigate('/login'));
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText=''
      email={values.email}
      userName={values.name}
      password={values.password}
      setEmail={handleChange}
      setPassword={handleChange}
      setUserName={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
