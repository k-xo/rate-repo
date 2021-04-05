import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
	constructor(namespace = 'auth') {
		this.namespace = namespace;
	}

	async getAccessToken() {
		try {
			const accessToken = await AsyncStorage.getItem(this.namespace);
			return accessToken;
		} catch (err) {
			console.log(err);
		}
	}

	async setAccessToken(accessToken) {
		try {
			await AsyncStorage.setItem(this.namespace, accessToken);
		} catch (err) {
			console.log(err);
		}
	}

	async removeAccessToken() {
		try {
			await AsyncStorage.removeItem(this.namespace);
		} catch (err) {
			console.log(err);
		}

		return true;
	}
}

export default AuthStorage;
