// react-router-dom
import { Link, useNavigate } from 'react-router-dom';

// components
import { Input } from '../../components/input';

// hooks
import { useState, FormEvent } from 'react';

// firebase
import { auth } from '../../services/firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError('');

    if (email === '' || password === '') {
      setError('E-mail e senha são obrigatórios');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/admin', { replace: true });
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-credential') {
          setError('E-mail ou senha inválidos');
        } else if (error.code === 'auth/user-not-found') {
          setError('Usuário não encontrado');
        } else {
          setError('Erro ao fazer login. Tente novamente.');
        }
      });
  }

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      {error && (
        <div className="bg-red-500/20 text-red-400 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
          Dev
          <span className="bg-linear-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">
            Link
          </span>
        </h1>
      </Link>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col px-5"
      >
        <Input
          placeholder="Digite seu email..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="************"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="h-9 bg-blue-500 rounded border-0 text-lg font-medium text-white cursor-pointer hover:bg-blue-600 transition-colors duration-300"
        >
          Acessar
        </button>
      </form>
    </div>
  );
};

export default Login;
