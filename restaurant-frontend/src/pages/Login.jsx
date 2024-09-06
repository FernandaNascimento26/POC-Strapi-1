import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: email,
        password
      });
      // Exibir mensagem de sucesso
      setMessage('Login bem-sucedido!');

      // Limpar os campos do formulário
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setMessage('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  // Função para redirecionar o usuário para login com Google
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:1337/api/connect/google';
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Entrar</button>
      </form>

      <p>{message}</p>

      <button onClick={handleGoogleLogin}>Entrar com Google</button>
    </div>
  );
}

export default Login;
