import {
	createContext,
	ReactElement,
	useEffect,
	useState
} from 'react';

import { User } from 'models/User';

export type AuthContextProps = {
	hasLoaded: boolean;
	isLoggedIn: boolean;
	login: (user: User) => void;
	logout: () => void;
	user: User;
};

export const AuthContext = createContext<AuthContextProps | undefined>(
	undefined
);

type Props = {
	children: ReactElement;
};

const ContextProvider = ({ children }: Props): ReactElement => {
	const [user, setUser] = useState<User | null>(null);
	const [hasLoaded, setHasLoaded] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const login = (user: User): void => {
		localStorage['user'] = JSON.stringify(user);

		setUser(user);
		setIsLoggedIn(true);
	};

	const logout = (): void => {
		delete localStorage['user'];

		setUser(null);
		setIsLoggedIn(false);
	};

	useEffect(() => {
		const savedUser = localStorage['user'];

		if (savedUser) {
			setUser(JSON.parse(savedUser));
			setIsLoggedIn(true);
		}

		setHasLoaded(true);
	}, []);

	return (
		<AuthContext.Provider
			value={{
				login,
				logout,
				user,
				hasLoaded,
				isLoggedIn
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default ContextProvider;
