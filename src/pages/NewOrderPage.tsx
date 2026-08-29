import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';


type PackageForm = {
  lengthCm: number;
  heightCm: number;
  widthCm: number;
  weightLb: number;
  content: string;
};

const createPackage = (): PackageForm => ({
  lengthCm: 1,
  heightCm: 1,
  widthCm: 1,
  weightLb: 1,
  content: '',
});

const initialForm = {
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
  packages: [createPackage()],
};

export function NewOrderPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [step, setStep] = useState<1 | 2>(1);

  function updateRoot(event: ChangeEvent<HTMLInputElement>) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  function updateRecipient(event: ChangeEvent<HTMLInputElement>) {
    setForm((current) => ({
      ...current,
      recipient: {
        ...current.recipient,
        [event.target.name]: event.target.value,
      },
    }));
  }

  function updatePackage(
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const value =
      event.target.type === 'number'
        ? Number(event.target.value)
        : event.target.value;

    setForm((current) => ({
      ...current,
      packages: current.packages.map((item, itemIndex) =>
        itemIndex === index
          ? { ...item, [event.target.name]: value }
          : item,
      ),
    }));
  }

  function addPackage() {
    setForm((current) => ({
      ...current,
      packages: [...current.packages, createPackage()],
    }));
  }

  function removePackage(index: number) {
    setForm((current) => ({
      ...current,
      packages:
        current.packages.length === 1
          ? current.packages
          : current.packages.filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  function handleNext(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setStep(2);
  }

  function handleBack() {
    setError('');
    setStep(1);
  }





  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    try {
      await api.post('/orders', {
        pickupAddress: form.pickupAddress,
        scheduledDate: `${form.scheduledDate}T10:00:00.000Z`,
        recipient: form.recipient,
        packages: form.packages,
      });

      navigate('/orders');
    } catch {
      setError('No se pudo crear la orden. Revisa los datos.');
    }
  }

  return (
    <main className="orders-page">
      <header className="page-header">
        <div>
          <h1>Crea una orden</h1>
          <p className="page-description">
            Dale una ventaja competitiva a tu negocio con entregas{' '}
            <strong>el mismo día</strong> (Área Metropolitana) y{' '}
            <strong>el día siguiente</strong> a nivel nacional.
          </p>
        </div>
      </header>


      <form className="order-form" onSubmit={step === 1 ? handleNext : handleSubmit}>
        {step === 1 && (
          <>


            <h2>Completa los datos</h2>
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

            <div className="form-grid">
              <label>
                Nombre
                <input
                  name="firstName"
                  value={form.recipient.firstName}
                  onChange={updateRecipient}
                  required
                />
              </label>

              <label>
                Apellido
                <input
                  name="lastName"
                  value={form.recipient.lastName}
                  onChange={updateRecipient}
                  required
                />
              </label>

              <label>
                Correo
                <input
                  name="email"
                  type="email"
                  value={form.recipient.email}
                  onChange={updateRecipient}
                  required
                />
              </label>

              <label className="phone-field">
                Teléfono
                <span className="phone-input">
                  <input
                    name="phoneCountryCode"
                    value={form.recipient.phoneCountryCode}
                    onChange={updateRecipient}
                    required
                  />

                  <input
                    name="phoneNumber"
                    value={form.recipient.phoneNumber}
                    onChange={updateRecipient}
                    required
                  />
                </span>
              </label>

              <label>
                Dirección
                <input
                  name="address"
                  value={form.recipient.address}
                  onChange={updateRecipient}
                  required
                />
              </label>

              <label>
                Departamento
                <input
                  name="department"
                  value={form.recipient.department}
                  onChange={updateRecipient}
                  required
                />
              </label>

              <label>
                Municipio
                <input
                  name="municipality"
                  value={form.recipient.municipality}
                  onChange={updateRecipient}
                  required
                />
              </label>
            </div>

          </>
        )}

        {step === 2 && (
          <>
            <div className="section-heading">
              <h2>Agrega tus productos</h2>
              <span>{form.packages.length} producto(s)</span>
            </div>

            <div className="packages-list">
              {form.packages.map((item, index) => (
                <div className="package-card" key={index}>
                  <div className="package-card-header">
                    <strong>Producto {index + 1}</strong>

                    {form.packages.length > 1 && (
                      <button
                        className="remove-package"
                        type="button"
                        onClick={() => removePackage(index)}
                      >
                        Eliminar
                      </button>
                    )}
                  </div>

                  <div className="form-grid">
                    <label>
                      Largo (cm)
                      <input
                        name="lengthCm"
                        type="number"
                        min="1"
                        value={item.lengthCm}
                        onChange={(event) => updatePackage(index, event)}
                        required
                      />
                    </label>

                    <label>
                      Alto (cm)
                      <input
                        name="heightCm"
                        type="number"
                        min="1"
                        value={item.heightCm}
                        onChange={(event) => updatePackage(index, event)}
                        required
                      />
                    </label>

                    <label>
                      Ancho (cm)
                      <input
                        name="widthCm"
                        type="number"
                        min="1"
                        value={item.widthCm}
                        onChange={(event) => updatePackage(index, event)}
                        required
                      />
                    </label>

                    <label>
                      Peso (lb)
                      <input
                        name="weightLb"
                        type="number"
                        min="1"
                        value={item.weightLb}
                        onChange={(event) => updatePackage(index, event)}
                        required
                      />
                    </label>
                  </div>

                  <label>
                    Contenido
                    <input
                      name="content"
                      value={item.content}
                      onChange={(event) => updatePackage(index, event)}
                      required
                    />
                  </label>
                </div>
              ))}
            </div>

            <button className="add-package" type="button" onClick={addPackage}>
              ＋ Agregar producto
            </button>
          </>
        )}


        {error && <p className="form-error">{error}</p>}

        {step === 1 ? (
          <button className="button button-primary" type="submit">
            Siguiente →
          </button>
        ) : (
          <div className="form-actions">
            <button
              className="button button-secondary"
              type="button"
              onClick={handleBack}
            >
              ← Regresar
            </button>

            <button className="button button-primary" type="submit">
              Enviar →
            </button>
          </div>
        )}



      </form>
    </main>
  );
}