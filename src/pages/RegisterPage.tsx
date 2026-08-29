import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import type { AuthResponse } from '../types';

const initialForm = {
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

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (form.password !== form.repeatPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const { data } = await api.post<AuthResponse>('/auth/register', form);

      sessionStorage.setItem('boxful_token', data.accessToken);
      navigate('/orders');
    } catch {
      setError('No se pudo crear la cuenta');
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Cuéntanos de ti</h1>
        <p>Completa la información de registro</p>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Nombre
              <input
                name="firstName"
                placeholder="Digita tu nombre"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Apellido
              <input
                name="lastName"
                placeholder="Digita tu apellido"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Sexo
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar</option>
                <option value="female">Femenino</option>
                <option value="male">Masculino</option>
                <option value="other">Otro</option>
              </select>
            </label>

            <label>
              Fecha de nacimiento
              <input
                name="birthDate"
                type="date"
                value={form.birthDate}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label>
            Correo electrónico
            <input
              name="email"
              type="email"
              placeholder="Digitar correo"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <div className="form-grid">
            <label>
              Código de país
              <select
                name="whatsappCountryCode"
                value={form.whatsappCountryCode}
                onChange={handleChange}
                required
              >
                <option value="+503">503</option>
              </select>
            </label>

            <label>
              Número de whatsapp
              <input
                name="whatsappNumber"
                placeholder="7777 7777"
                value={form.whatsappNumber}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="form-grid">
            <label>
              Contraseña
              <input
                name="password"
                type="password"
                placeholder="Digitar contraseña"
                value={form.password}
                onChange={handleChange}
                minLength={8}
                required
              />
            </label>

            <label>
              Repetir contraseña
              <input
                name="repeatPassword"
                type="password"
                placeholder="Digitar contraseña"
                value={form.repeatPassword}
                onChange={handleChange}
                minLength={8}
                required
              />
            </label>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit">Siguiente</button>
        </form>

        <p>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </section>
    </main>
  );
}