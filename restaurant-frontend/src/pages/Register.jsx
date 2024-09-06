import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1337/api/auth/local/register', {
        username,
        email,
        password
      });
      // Exibir mensagem de sucesso
      setMessage('Registro bem-sucedido!');
      
      // Limpar os campos do formulário
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Erro ao registrar:', error);
      setMessage('Erro ao registrar. Tente novamente.');
    }
  };

  // Função para redirecionar o usuário para login com Google
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:1337/api/connect/google';
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Usuário" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
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
        <button type="submit">Registrar</button>
      </form>

      <p>{message}</p>

      <button onClick={handleGoogleLogin}>Registrar com Google</button>
    </div>
  );
}

export default Register;
