import Link from 'next/link';
import { memo, useContext } from 'react';

import { AppContext, AppContextProps } from 'pages/_app';
import { AuthContext, AuthContextProps } from 'contexts/AuthContext';

import {
	MessageStyled,
	MessageHashTag,
	MessageText,
	NavigationStyled,
	NavigationMenu,
	NavigationMenuItem
} from './Navigation.styles';

const Message = () => (
	<MessageStyled>
		<MessageHashTag className="bold">#COMPRALEALPERÚ:</MessageHashTag>
		<MessageText className="medium">
			Cada compra es una muestra de apoyo a un emprendedor peruano
		</MessageText>
	</MessageStyled>
);

export const Navigation = memo(() => {
	const { user, logout }: AuthContextProps = useContext(AuthContext);
	const { openLoginModal }: AppContextProps = useContext(AppContext);

	const handleLogin = (): void => {
		openLoginModal();
	};

	const handleLogout = (): void => {
		logout();
	};

	return (
		<NavigationStyled className="flex row max-layout-width">
			<Message />
			<NavigationMenu>
				{user ? (
					<>
						<NavigationMenuItem
							className="flex row medium"
							onClick={handleLogout}
						>
							Cerrar Sesión
						</NavigationMenuItem>
					</>
				) : (
					<NavigationMenuItem
						className="medium"
						onClick={handleLogin}
					>
						Iniciar Sesión
					</NavigationMenuItem>
				)}
			</NavigationMenu>
		</NavigationStyled>
	);
});
