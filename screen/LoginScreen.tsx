
import React, { useContext, useState } from 'react';
import { Button, TextInput,Animated } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { tailwind } from '../tailwind';

const LoginScreen = () => {
  const { login } = useContext(AuthContext)  || { login: () => {} }; 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const fadeAnim = new Animated.Value(0);

  const handleLogin = async () => {
    try {
      await login(username, password);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <Animated.View style={[tailwind('flex-1 justify-center p-4'), { opacity: fadeAnim }]}>
      <TextInput
        style={tailwind('border p-2 mb-4')}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={tailwind('border p-2 mb-4')}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </Animated.View>
  );
};

export default LoginScreen;
