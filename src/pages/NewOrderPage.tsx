import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

const initialForm = { //loas primeros valores del form
  pickupAddress: '',
  scheduledDate: '',
  recipient: {
    firstName: '',
    lastName: '',
    email: '',
    phoneCountryCode: '+503',
    phoneNumber: '',
    address: '',
    department: '',
    municipality: '',
  },
  package: {
    lengthCm: 1,
    heightCm: 1,
    widthCm: 1,
    weightLb: 1,
    content: '',
  },
};

export function NewOrderPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  //actualiza los dtos del envio
  function updateRoot(event: ChangeEvent<HTMLInputElement>) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  //actualiza los datos sin perder los anteriores 
  function updateRecipient(event: ChangeEvent<HTMLInputElement>) {
    setForm((current) => ({
      ...current,
      recipient: {
        ...current.recipient,
        [event.target.name]: event.target.value,
      },
    }));
  }
  
  //envia las ordenes en el formato que espera el backend
  function updatePackage(event: ChangeEvent<HTMLInputElement>) {
    const value =
      event.target.type === 'number'
        ? Number(event.target.value)
        : event.target.value;

    setForm((current) => ({
      ...current,
      package: {
        ...current.package,
        [event.target.name]: value,
      },
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    try {
      await api.post('/orders', {
        pickupAddress: form.pickupAddress,
        scheduledDate: `${form.scheduledDate}T10:00:00.000Z`,
        recipient: form.recipient,
        packages: [form.package], //lista de paquetes espera el backend
      });

      navigate('/orders'); // regresamos al historial despues de crear una orden
    } catch {
      setError('No se pudo crear la orden. Revisa los datos.');
    }
  }

  return (
    <main className="orders-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Boxful</p>
          <h1>Nueva orden</h1>
        </div>
        <Link className="button button-secondary" to="/orders">
          Volver
        </Link>
      </header>

      <form className="order-form" onSubmit={handleSubmit}>
        <h2>Datos del envío</h2>

        <label>
          Dirección de recogida
          <input
            name="pickupAddress"
            value={form.pickupAddress}
            onChange={updateRoot}
            required
          />
        </label>

        <label>
          Fecha programada
          <input
            name="scheduledDate"
            type="date"
            value={form.scheduledDate}
            onChange={updateRoot}
            required
          />
        </label>

        <h2>Datos del destinatario</h2>

        <div className="form-grid">
          <label>
            Nombre
            <input name="firstName" value={form.recipient.firstName} onChange={updateRecipient} required />
          </label>

          <label>
            Apellido
            <input name="lastName" value={form.recipient.lastName} onChange={updateRecipient} required />
          </label>

          <label>
            Correo
            <input name="email" type="email" value={form.recipient.email} onChange={updateRecipient} required />
          </label>

          <label>
            Código de país
            <input name="phoneCountryCode" value={form.recipient.phoneCountryCode} onChange={updateRecipient} required />
          </label>

          <label>
            Teléfono
            <input name="phoneNumber" value={form.recipient.phoneNumber} onChange={updateRecipient} required />
          </label>

          <label>
            Dirección
            <input name="address" value={form.recipient.address} onChange={updateRecipient} required />
          </label>

          <label>
            Departamento
            <input name="department" value={form.recipient.department} onChange={updateRecipient} required />
          </label>

          <label>
            Municipio
            <input name="municipality" value={form.recipient.municipality} onChange={updateRecipient} required />
          </label>
        </div>

        <h2>Paquete</h2>

        <div className="form-grid">
          <label>
            Largo (cm)
            <input name="lengthCm" type="number" min="1" value={form.package.lengthCm} onChange={updatePackage} required />
          </label>

          <label>
            Alto (cm)
            <input name="heightCm" type="number" min="1" value={form.package.heightCm} onChange={updatePackage} required />
          </label>

          <label>
            Ancho (cm)
            <input name="widthCm" type="number" min="1" value={form.package.widthCm} onChange={updatePackage} required />
          </label>

          <label>
            Peso (lb)
            <input name="weightLb" type="number" min="1" value={form.package.weightLb} onChange={updatePackage} required />
          </label>
        </div>

        <label>
          Contenido
          <input name="content" value={form.package.content} onChange={updatePackage} required />
        </label>

        {error && <p className="form-error">{error}</p>}

        <button className="button button-primary" type="submit">
          Crear orden
        </button>
      </form>
    </main>
  );
}