import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
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
        email: email.trim().toLowerCase(),
        password,
      });


      // hay q guardar el token para las peticiones siguientes
      sessionStorage.setItem('boxful_token', data.accessToken);
      sessionStorage.setItem('boxful_user', JSON.stringify(data.user));
      navigate('/orders/new');

    } catch (requestError) {
      if (isAxiosError(requestError)) {
        if (!requestError.response) {
          setError('No se pudo conectar con el servidor. Inténtalo nuevamente.');
        } else if (requestError.response.status === 400) {
          setError('Verifica que el correo electrónico sea válido.');
        } else if (requestError.response.status === 401) {
          setError('Correo o contraseña incorrectos.');
        } else {
          setError('No se pudo iniciar sesión. Inténtalo nuevamente.');
        }
      } else {
        setError('No se pudo iniciar sesión. Inténtalo nuevamente.');
      }
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card login-card">        <h1>Bienvenido</h1>
        <p>Por favor ingresa tus credenciales</p>

        <form className="login-form" onSubmit={handleSubmit}>          <label>
          Correo electrónico
          <input
            type="email"
            placeholder="Digita tu correo"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

          <label>
            Contraseña
            <input
              type="password"
              placeholder="Digita el NIT del comercio"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit">Iniciar sesión</button>
        </form>

        <p>
          ¿Necesitas una cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </section>
    </main>
  );
}
