import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import type { AuthResponse } from '../types';


const initialForm = { //los valores del form
  firstName: '',
  lastName: '',
  gender: '',
  birthDate: '',
  email: '',
  whatsappCountryCode: '+503',
  whatsappNumber: '',
  password: '',
  repeatPassword: '',
};

export function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');


  // se actualiza el campo q el usuario modifica
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
     //que las dos contaseñas sean iguales
    if (form.password !== form.repeatPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try { // se envian los datos del registro al backend
      const { data } = await api.post<AuthResponse>('/auth/register', form);


      // se guarda el token y llevamos al usuario a sus órdenes
      sessionStorage.setItem('boxful_token', data.accessToken);
      navigate('/orders');
    } catch {
      setError('No se pudo crear la cuenta');
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Crea tu cuenta</h1>
        <p>Regístrate para comenzar a enviar.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Nombre
              <input name="firstName" value={form.firstName} onChange={handleChange} required />
            </label>

            <label>
              Apellido
              <input name="lastName" value={form.lastName} onChange={handleChange} required />
            </label>

            <label>
              Género
              <input name="gender" value={form.gender} onChange={handleChange} required />
            </label>

            <label>
              Fecha de nacimiento
              <input name="birthDate" type="date" value={form.birthDate} onChange={handleChange} required />
            </label>
          </div>

          <label>
            Correo electrónico
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>

          <div className="form-grid">
            <label>
              Código de país
              <input name="whatsappCountryCode" value={form.whatsappCountryCode} onChange={handleChange} required />
            </label>

            <label>
              WhatsApp
              <input name="whatsappNumber" value={form.whatsappNumber} onChange={handleChange} required />
            </label>
          </div>

          <label>
            Contraseña
            <input name="password" type="password" value={form.password} onChange={handleChange} minLength={8} required />
          </label>

          <label>
            Repite la contraseña
            <input name="repeatPassword" type="password" value={form.repeatPassword} onChange={handleChange} minLength={8} required />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit">Crear cuenta</button>
        </form>

        <p>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </section>
    </main>
  );
}