import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import type { AuthResponse } from '../types';

export function LoginPage() {
    
  const navigate = useNavigate(); //guardo valores del form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    try { //se envia las credenciales al back
      const { data } = await api.post<AuthResponse>('/auth/login', {
        email,
        password,
      });


      // hay q guardar el token para las peticiones siguientes
      sessionStorage.setItem('boxful_token', data.accessToken);
      navigate('/orders');
    } catch {
      setError('Correo o contraseña incorrectos');
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Bienvenido a Boxful</h1>
        <p>Ingresa para gestionar tus envíos.</p>

        <form onSubmit={handleSubmit}>
          <label>
            Correo electrónico
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit">Iniciar sesión</button>
        </form>

        <p>
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </section>
    </main>
  );
}