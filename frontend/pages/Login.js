import React from 'react';
import { Button, TextInput, StyleSheet, View } from 'react-native';

const Login = ({navigation}) => {
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);

  const loginPost = async (email, password) => {
    // alert("Email: " + email + ", password: " + password);
    return await fetch('http://localhost:8082/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
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
              const result = await loginPost(email, password);

              if (result.result.code == 1020) {
                navigation.navigate("Search", {accessToken: result.accessToken, refreshToken: result.refreshToken});
              } else {
                alert("Incorrect user credentials!");
              }
            }
          }
          title="LOGIN"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate("Register")}
          title="REGISTER"
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
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Login;
