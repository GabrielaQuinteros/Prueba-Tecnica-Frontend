import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import type { AuthResponse } from '../types';
import { isAxiosError } from 'axios';

// los codigos para los paises en el telefono
const countryCodes = [
  { country: 'Estados Unidos y Canadá', code: '+1' },
  { country: 'México', code: '+52' },
  { country: 'Argentina', code: '+54' },
  { country: 'Brasil', code: '+55' },
  { country: 'Chile', code: '+56' },
  { country: 'Colombia', code: '+57' },
  { country: 'Perú', code: '+51' },
  { country: 'Bolivia', code: '+591' },
  { country: 'Ecuador', code: '+593' },
  { country: 'Paraguay', code: '+595' },
  { country: 'Uruguay', code: '+598' },
  { country: 'Venezuela', code: '+58' },
  { country: 'Guatemala', code: '+502' },
  { country: 'El Salvador', code: '+503' },
  { country: 'Honduras', code: '+504' },
  { country: 'Nicaragua', code: '+505' },
  { country: 'Costa Rica', code: '+506' },
  { country: 'Panamá', code: '+507' },
  { country: 'España', code: '+34' },
];


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
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [showPhoneConfirmation, setShowPhoneConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCountryMenu, setShowCountryMenu] = useState(false);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  function handleCountrySelection(code: string) {
    setForm((current) => ({
      ...current,
      whatsappCountryCode: code,
    }));

    setShowCountryMenu(false);
  }


  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (form.password !== form.repeatPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setShowPhoneConfirmation(true);
  }

  async function handleConfirmRegistration() {
    setError('');
    setIsSubmitting(true);

    try {
      const { data } = await api.post<AuthResponse>('/auth/register', form);

      sessionStorage.setItem('boxful_token', data.accessToken);
      navigate('/orders');
    } catch (requestError) {
      if (
        isAxiosError(requestError) &&
        requestError.response?.status === 409
      ) {
        setError(
          'Este correo ya está registrado. Usa un correo diferente o inicia sesión.',
        );
      } else {
        setError(
          'No se pudo crear la cuenta. Verifica los datos e inténtalo nuevamente.',
        );
      }

      setShowPhoneConfirmation(false);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <main className="auth-page">
      <section className="auth-card register-card">
        <div className="register-heading">
          <Link
            className="auth-back-link"
            to="/login"
            aria-label="Regresar al inicio de sesión"
          >
            <i className="fi fi-rr-angle-small-left" aria-hidden="true" />
          </Link>

          <h1>Cuéntanos de ti</h1>
        </div>

        <p>Completa la información de registro</p>

        <form
          className="register-form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
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
          </div>

          <div className="form-grid">
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

          <div className="form-grid">
            <label>
              Correo electrónico
              <input
                name="email"
                type="email"
                autoComplete="off"
                placeholder="Digitar correo"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Número de whatsapp
              <span className="whatsapp-input">
                <span className="country-code-field">
                  <button
                    className="country-code-trigger"
                    type="button"
                    aria-label="Seleccionar código de país"
                    aria-expanded={showCountryMenu}
                    onClick={() => setShowCountryMenu((open) => !open)}
                  >
                    <span>{form.whatsappCountryCode.replace('+', '')}</span>

                    <i
                      className={`fi ${showCountryMenu
                          ? 'fi-rr-angle-small-up'
                          : 'fi-rr-angle-small-down'
                        }`}
                      aria-hidden="true"
                    />
                  </button>

                  {showCountryMenu && (
                    <div className="country-code-menu" role="listbox">
                      {countryCodes.map(({ country, code }) => (
                        <button
                          className={`country-code-option ${form.whatsappCountryCode === code ? 'active' : ''
                            }`}
                          type="button"
                          role="option"
                          aria-selected={form.whatsappCountryCode === code}
                          key={`${country}-${code}`}
                          onClick={() => handleCountrySelection(code)}
                        >
                          <span>{country}</span>
                          <strong>{code}</strong>
                        </button>
                      ))}
                    </div>
                  )}
                </span>

                <input
                  name="whatsappNumber"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="7777 7777"
                  value={form.whatsappNumber}
                  onChange={handleChange}
                  aria-label="Número de whatsapp"
                  required
                />
              </span>
            </label>
          </div>

          <div className="form-grid">
            <label>
              Contraseña
              <span className="password-input">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Digitar contraseña"
                  value={form.password}
                  onChange={handleChange}
                  minLength={8}
                  required
                />

                <button
                  className="password-toggle"
                  type="button"
                  aria-label={
                    showPassword
                      ? 'Ocultar contraseña'
                      : 'Mostrar contraseña'
                  }
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  <i
                    className={`fi ${showPassword
                      ? 'fi-rr-eye-crossed'
                      : 'fi-rr-eye'
                      }`}
                    aria-hidden="true"
                  />
                </button>
              </span>
            </label>

            <label>
              Repetir contraseña
              <span className="password-input">
                <input
                  name="repeatPassword"
                  type={showRepeatPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Digitar contraseña"
                  value={form.repeatPassword}
                  onChange={handleChange}
                  minLength={8}
                  required
                />

                <button
                  className="password-toggle"
                  type="button"
                  aria-label={
                    showRepeatPassword
                      ? 'Ocultar contraseña repetida'
                      : 'Mostrar contraseña repetida'
                  }
                  onClick={() =>
                    setShowRepeatPassword((visible) => !visible)
                  }
                >
                  <i
                    className={`fi ${showRepeatPassword
                      ? 'fi-rr-eye-crossed'
                      : 'fi-rr-eye'
                      }`}
                    aria-hidden="true"
                  />
                </button>
              </span>
            </label>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit">Siguiente</button>
        </form>
      </section>

      {showPhoneConfirmation && (
        <div className="phone-modal-backdrop">
          <section
            className="phone-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="phone-confirmation-title"
          >
            <button
              className="phone-modal-close"
              type="button"
              aria-label="Cerrar confirmación"
              onClick={() => setShowPhoneConfirmation(false)}
              disabled={isSubmitting}
            >
              <i className="fi fi-rr-cross-small" aria-hidden="true" />
            </button>

            <div className="phone-modal-icon" aria-hidden="true">
              <i className="fi fi-rr-triangle-warning" />
            </div>

            <h2 id="phone-confirmation-title">
              Confirmar número <strong>de teléfono</strong>
            </h2>

            <p>
              Está seguro de que desea continuar con el número{' '}
              <strong>
                {form.whatsappCountryCode} {form.whatsappNumber}
              </strong>
              ?
            </p>

            <div className="phone-modal-actions">
              <button
                className="phone-modal-cancel"
                type="button"
                onClick={() => setShowPhoneConfirmation(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </button>

              <button
                className="phone-modal-confirm"
                type="button"
                onClick={handleConfirmRegistration}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registrando...' : 'Aceptar'}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}