import { ReactElement, useContext, useEffect, useState } from 'react';

import { AuthContext, AuthContextProps } from 'contexts/AuthContext';

import ProfileService from 'services/ProfileServices';
import { useRouter } from 'next/router';

const profileService = new ProfileService();

const ProfileContainer = (): ReactElement => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [once, setOnce] = useState<boolean>(false);
	const { replace } = useRouter();
	const { user, hasLoaded, logout }: AuthContextProps = useContext(
		AuthContext
	);
	const [page, setPage] = useState('');

	const getProfilePage = async (token) => {
		try {
			const response = await profileService.getProfilePage(token);
			setPage(response.data);
			setOnce(true);
		} catch (err) {
			console.log('Error >', err);
			logout();
			replace('/');
		}
	};

	useEffect(() => {
		if (hasLoaded) {
			if (user) {
				getProfilePage(user.token);
			} else {
				replace(!once ? '/?login=true' : '/');
			}
		}
	}, [user]);

	return <div dangerouslySetInnerHTML={{ __html: page }}></div>;
};

export default ProfileContainer;
