import { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import { AuthContext, AuthContextProps } from 'contexts/AuthContext';

import {
	LoginModalStyled,
	LoginModalContent,
	LoginModalBody,
	LoginModalHeader,
	LoginModalTitle,
	LoginModalClose,
	LoginModalFooter,
	SignInStyled,
	SignUpStyled,
	MessageError,
	Notification
} from './LoginModal.styles';

import Input from 'components/Input';
import { Button } from 'components/Button';
import AuthService from 'services/AuthService';
import { User } from 'models/User';
import { AppContext, AppContextProps } from 'pages/_app';

const authService = new AuthService();
const REGISTER_SUCCESS_MESSAGE =
	'Gracias por registrarte en comprale al peru, ya puedes realizar tus compras';

type SignInProps = {
	successOperation: (user: User) => void;
};

const SignIn = ({ successOperation }: SignInProps) => {
	const [messageError, setMessageError] = useState<string>('');
	const SignInSchema = Yup.object().shape({
		email: Yup.string().email().required('El email es requerido'),
		password: Yup.string()
			.min(6, 'La contraseña debe contener al menos 6 caracteres')
			.required('La contraseña es requerida')
	});

	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		onSubmit: async (values, { setSubmitting }) => {
			setSubmitting(true);
			setMessageError('');

			try {
				const { data: responseData } = await authService.login(values);
				successOperation(responseData.data);
			} catch (err) {
				const { data = {} } = err?.response;
				setMessageError(data.message);
			} finally {
				setSubmitting(false);
			}
		},
		validateOnMount: true,
		validationSchema: SignInSchema
	});

	return (
		<SignInStyled>
			<form onSubmit={formik.handleSubmit}>
				<Input
					label="Email"
					value={formik.values.email}
					name="email"
					required
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					hasError={!!(formik.touched.email && formik.errors.email)}
					errorMessage={formik.errors.email}
				/>
				<Input
					label="Contraseña"
					value={formik.values.password}
					type="password"
					name="password"
					required
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					hasError={
						!!(formik.touched.password && formik.errors.password)
					}
					errorMessage={formik.errors.password}
				/>
				<MessageError className="semi-bold">
					{messageError ? messageError : ''}
				</MessageError>
				<Button
					variant="danger"
					type="submit"
					disabled={formik.isSubmitting || !formik.isValid}
					className="semi-bold"
				>
					{formik.isSubmitting ? 'Loading...' : 'Iniciar sesión'}
				</Button>
			</form>
		</SignInStyled>
	);
};

type SignUpProps = {
	successOperation: (user: User) => void;
};

const SignUp = ({ successOperation }: SignUpProps) => {
	const [messageError, setMessageError] = useState<string>('');
	const SignUpSchema = Yup.object().shape({
		name: Yup.string().required('El nombre es requerido'),
		lastname: Yup.string().required('El apellido es requerido'),
		email: Yup.string().email().required('El email es requerido'),
		password: Yup.string()
			.min(6, 'La contraseña debe contener al menos 6 caracteres')
			.required('La contraseña es requerida'),
		confirmPassword: Yup.string()
			.required('Debe confirmar la contraseña')
			.oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
	});

	const formik = useFormik({
		initialValues: {
			name: '',
			lastname: '',
			email: '',
			password: '',
			confirmPassword: ''
		},
		validateOnMount: true,
		onSubmit: async (values, { setSubmitting }) => {
			setSubmitting(true);
			setMessageError('');

			try {
				const { data: responseData } = await authService.register({
					...values
				});
				successOperation(responseData.data);
			} catch (err) {
				const { data = {} } = err?.response;

				if ('CUSTOMER_EXIST_ERROR' === data.message) {
					setMessageError(
						'Ya existe una cuenta con el email ingresado'
					);
				}
			} finally {
				setSubmitting(false);
			}
		},
		validationSchema: SignUpSchema
	});

	return (
		<SignUpStyled>
			<form onSubmit={formik.handleSubmit}>
				<Input
					label="Nombre"
					value={formik.values.name}
					name="name"
					required
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					hasError={!!(formik.touched.name && formik.errors.name)}
					errorMessage={formik.errors.name}
				/>
				<Input
					label="Apellidos"
					value={formik.values.lastname}
					name="lastname"
					required
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					hasError={
						!!(formik.touched.lastname && formik.errors.lastname)
					}
					errorMessage={formik.errors.lastname}
				/>
				<Input
					label="Email"
					value={formik.values.email}
					name="email"
					required
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					hasError={!!(formik.touched.email && formik.errors.email)}
					errorMessage={formik.errors.email}
				/>
				<Input
					label="Contraseña"
					value={formik.values.password}
					name="password"
					required
					type="password"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					hasError={
						!!(formik.touched.password && formik.errors.password)
					}
					errorMessage={formik.errors.password}
				/>
				<Input
					label="Verificar contraseña"
					value={formik.values.confirmPassword}
					name="confirmPassword"
					required
					type="password"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					hasError={
						!!(
							formik.touched.confirmPassword &&
							formik.errors.confirmPassword
						)
					}
					errorMessage={formik.errors.confirmPassword}
				/>
				<MessageError className="semi-bold">
					{messageError ? messageError : ''}
				</MessageError>
				<Button
					variant="danger"
					type="submit"
					disabled={formik.isSubmitting || !formik.isValid}
					className="semi-bold"
				>
					{formik.isSubmitting ? 'Loading...' : 'Crear una cuenta'}
				</Button>
			</form>
		</SignUpStyled>
	);
};

export const LoginModal = () => {
	const [isRequesting, setIsRequesting] = useState<boolean>(false);
	const { query } = useRouter();
	const { closeLoginModal }: AppContextProps = useContext(AppContext);
	const { login }: AuthContextProps = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(true);
	const [showSignInForm, setShowSignInForm] = useState<boolean>(false);
	const [notification, setNotification] = useState<string>('');

	const handleChangeForm = () => {
		setShowSignInForm((current) => !current);
	};

	const handleClose = () => {
		closeLoginModal();
	};

	const handleSuccessLogin = (user: User): void => {
		login(user);
		handleClose();
	};

	const handleSuccessRegister = (user: User): void => {
		login(user);
		setNotification(REGISTER_SUCCESS_MESSAGE);
	};

	const confirmEmail = async (token) => {
		try {
			await authService.confirmEmail(token);
		} catch (error) {
			console.log('Errro >', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const { login, token } = query;

		if (login === 'true' && token) {
			confirmEmail(token);
		} else {
			setIsLoading(false);
		}
	}, [query]);

	return (
		<LoginModalStyled className="flex column">
			{notification ? (
				<LoginModalContent className="flex column">
					<Notification className="flex column">
						{notification}
						<Button variant="primary" onClick={handleClose}>
							Cerrar
						</Button>
					</Notification>
				</LoginModalContent>
			) : (
				<LoginModalContent className="flex column">
					{isLoading ? (
						<div className="center loading" style={{ height: 300 }}>
							Cargando...
						</div>
					) : (
						<>
							<LoginModalHeader className="flex row">
								<LoginModalTitle className="semi-bold">
									{showSignInForm
										? 'Iniciar Sesión'
										: 'Crear cuenta'}
								</LoginModalTitle>
								<LoginModalClose
									className="pointer"
									onClick={handleClose}
									disabled={isRequesting}
								>
									x
								</LoginModalClose>
							</LoginModalHeader>
							<LoginModalBody>
								{showSignInForm ? (
									<SignIn
										successOperation={handleSuccessLogin}
									/>
								) : (
									<SignUp
										successOperation={handleSuccessRegister}
									/>
								)}
							</LoginModalBody>
							<LoginModalFooter>
								<Button
									className="medium"
									onClick={handleChangeForm}
									disabled={isRequesting}
								>
									{showSignInForm
										? 'Crear una cuenta'
										: 'Ya tengo una cuenta'}
								</Button>
							</LoginModalFooter>
						</>
					)}
				</LoginModalContent>
			)}
		</LoginModalStyled>
	);
};
