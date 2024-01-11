import React from 'react';
import { Button, TextInput, StyleSheet, View } from 'react-native';
import idm from '../backend/idm';

const Register = ({navigation}) => {
	const [email, onChangeEmail] = React.useState(null);
	const [password, onChangePassword] = React.useState(null);

	const registerPost = async (email, password) => {
		const payLoad = {
			email: email,
			password: password.split('')
		}

		return idm.register(payLoad)
			.catch(error => alert(JSON.stringify(error.response.data, null, 2)));
	};

	return (
		<View>
			<TextInput
				style={styles.input}
				onChangeText={onChangeEmail}
				placeholder="Email"
				value={email}
			/>
			<TextInput
				style={styles.input}
				onChangeText={onChangePassword}
				placeholder="Password"
				value={password}
			/>
			<View style={styles.buttonContainer}>
				<Button
					onPress={
						async () => {
							const result = await registerPost(email, password);
							if (result.result.code == 1010) {
								alert("Success!");
							} else {
								alert("Something went wrong...")
							}
						}
					}
					title="SIGN UP"
					color="#841584"
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	buttonContainer: {
		margin: 20
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
});

export default Register;
