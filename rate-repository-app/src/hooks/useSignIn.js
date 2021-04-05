import { useApolloClient, useMutation } from '@apollo/client';
import { AUTHORIZE_MUTATION } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();
	const [ mutate ] = useMutation(AUTHORIZE_MUTATION);

	const signIn = async ({ username, password }) => {
		const { data } = await mutate({ variables: { username, password } });

		await authStorage.setAccessToken(data.authorize.accessToken);
		apolloClient.resetStore();
		return data;
	};

	return [ signIn ];
};

export default useSignIn;
