import ProfileContainer from 'container/ProfileContainer';
import { ReactElement } from 'react';

const Profile = (): ReactElement => <ProfileContainer />;

export const getStaticProps = async () => {
	return {
		props: {
			hideCart: true
		}
	};
};

export default Profile;
