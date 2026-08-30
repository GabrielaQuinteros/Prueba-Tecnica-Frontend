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

const createPackage = (): PackageForm => ({
  lengthCm: 0,
  heightCm: 0,
  widthCm: 0,
  weightLb: 0,
  content: '',
});

const initialForm = {
  pickupAddress: '',
  scheduledDate: '',
  cashOnDelivery: false,
  expectedCollectionAmount: '',
  recipient: {
    firstName: '',
    lastName: '',
    email: '',
    phoneCountryCode: '+503',
    phoneNumber: '',
    address: '',
    department: '',
    municipality: '',
    referencePoint: '',
    instructions: '',
  },
  packages: [] as PackageForm[],
};

export function NewOrderPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [draftPackage, setDraftPackage] = useState(createPackage());
  const [error, setError] = useState('');
  const [step, setStep] = useState<1 | 2>(1);
  const [showCountryMenu, setShowCountryMenu] = useState(false);

  function updateRoot(event: ChangeEvent<HTMLInputElement>) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  function toggleCashOnDelivery() {
    setForm((current) => {
      const cashOnDelivery = !current.cashOnDelivery;

      return {
        ...current,
        cashOnDelivery,
        expectedCollectionAmount: cashOnDelivery
          ? current.expectedCollectionAmount
          : '',
      };
    });
  }

  function updateCollectionAmount(event: ChangeEvent<HTMLInputElement>) {
    setForm((current) => ({
      ...current,
      expectedCollectionAmount: event.target.value,
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

  function handleCountrySelection(code: string) {
    setForm((current) => ({
      ...current,
      recipient: {
        ...current.recipient,
        phoneCountryCode: code,
      },
    }));

    setShowCountryMenu(false);
  }

  function updateDraftPackage(event: ChangeEvent<HTMLInputElement>) {
    const value =
      event.target.type === 'number'
        ? Number(event.target.value)
        : event.target.value;

    setDraftPackage((current) => ({
      ...current,
      [event.target.name]: value,
    }));
  }

  function addPackage() {
    if (
      draftPackage.lengthCm <= 0 ||
      draftPackage.heightCm <= 0 ||
      draftPackage.widthCm <= 0 ||
      draftPackage.weightLb <= 0 ||
      !draftPackage.content.trim()
    ) {
      setError('Completa todos los datos del producto.');
      return;
    }

    setForm((current) => ({
      ...current,
      packages: [
        ...current.packages,
        {
          ...draftPackage,
          content: draftPackage.content.trim(),
        },
      ],
    }));

    setDraftPackage(createPackage());
    setError('');
  }

  function removePackage(index: number) {
    setForm((current) => ({
      ...current,
      packages: current.packages.filter(
        (_, itemIndex) => itemIndex !== index,
      ),
    }));
  }

  function handleNext(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (
      form.cashOnDelivery &&
      Number(form.expectedCollectionAmount) <= 0
    ) {
      setError('Ingresa un monto válido para el pago contra entrega.');
      return;
    }

    setStep(2);
  }

  function handleBack() {
    setError('');
    setStep(1);
  }





  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (form.packages.length === 0) {
      setError('Agrega al menos un producto antes de enviar la orden.');
      return;
    }

    try {
      await api.post('/orders', {
        pickupAddress: form.pickupAddress,
        scheduledDate: `${form.scheduledDate}T10:00:00.000Z`,
        recipient: form.recipient,
        packages: form.packages,
        cashOnDelivery: form.cashOnDelivery,
        ...(form.cashOnDelivery
          ? {
              expectedCollectionAmount: Number(
                form.expectedCollectionAmount,
              ),
            }
          : {}),
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
              Dirección de recolección
              <input
                name="pickupAddress"
                value={form.pickupAddress}
                onChange={updateRoot}
                required
              />
            </label>

            <label>
              Fecha programada
              <span className="order-date-input">
                <input
                  name="scheduledDate"
                  type="date"
                  value={form.scheduledDate}
                  onChange={updateRoot}
                  required
                />

                <i className="fi fi-rr-calendar" aria-hidden="true" />
              </span>
            </label>

            <div className="form-grid order-recipient-grid">
              <label>
                Nombres
                <input
                  name="firstName"
                  value={form.recipient.firstName}
                  onChange={updateRecipient}
                  required
                />
              </label>

              <label>
                Apellidos
                <input
                  name="lastName"
                  value={form.recipient.lastName}
                  onChange={updateRecipient}
                  required
                />
              </label>

              <label>
                Correo electrónico
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

                <span className="whatsapp-input order-phone-input">
                  <span className="country-code-field">
                    <button
                      className="country-code-trigger"
                      type="button"
                      aria-label="Seleccionar código de país"
                      aria-expanded={showCountryMenu}
                      onClick={() => setShowCountryMenu((open) => !open)}
                    >
                      <span>
                        {form.recipient.phoneCountryCode.replace('+', '')}
                      </span>

                      <i
                        className={`fi ${
                          showCountryMenu
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
                            className={`country-code-option ${
                              form.recipient.phoneCountryCode === code
                                ? 'active'
                                : ''
                            }`}
                            type="button"
                            role="option"
                            aria-selected={
                              form.recipient.phoneCountryCode === code
                            }
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
                    name="phoneNumber"
                    inputMode="numeric"
                    placeholder="7777 7777"
                    value={form.recipient.phoneNumber}
                    onChange={updateRecipient}
                    aria-label="Número de teléfono"
                    required
                  />
                </span>
              </label>

              <label className="recipient-address-field">
                Dirección del destinatario
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

              <label>
                Punto de referencia
                <input
                  name="referencePoint"
                  value={form.recipient.referencePoint}
                  onChange={updateRecipient}
                />
              </label>

              <label className="recipient-instructions-field">
                Indicaciones
                <input
                  name="instructions"
                  value={form.recipient.instructions}
                  onChange={updateRecipient}
                />
              </label>
            </div>

            <section
              className={`cod-panel ${
                form.cashOnDelivery ? 'cod-panel-active' : ''
              }`}
            >
              <div className="cod-panel-header">
                <h3>Pago contra entrega (PCE)</h3>

                <button
                  className={`cod-switch ${
                    form.cashOnDelivery ? 'active' : ''
                  }`}
                  type="button"
                  role="switch"
                  aria-checked={form.cashOnDelivery}
                  aria-label="Activar pago contra entrega"
                  onClick={toggleCashOnDelivery}
                >
                  <span />
                </button>
              </div>

              <div className="cod-panel-content">
                <p>
                  Tu cliente paga el monto que <strong>indiques</strong> al
                  momento de la entrega
                </p>

                <label className="cod-amount-input">
                  <span>$</span>

                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="00.00"
                    value={form.expectedCollectionAmount}
                    onChange={updateCollectionAmount}
                    disabled={!form.cashOnDelivery}
                    required={form.cashOnDelivery}
                    aria-label="Monto esperado del pago contra entrega"
                  />
                </label>
              </div>
            </section>

          </>
        )}

        {step === 2 && (
          <>
            <div className="section-heading">
              <h2>Agrega tus productos</h2>
            </div>

            <section className="product-entry">
              <div className="product-box-icon" aria-hidden="true">
                <i className="fi fi-rr-box" />
              </div>

              <div className="product-dimensions">
                <label>
                  Largo
                  <span className="measurement-input">
                    <input
                      name="lengthCm"
                      type="number"
                      min="1"
                      placeholder="0"
                      value={draftPackage.lengthCm || ''}
                      onChange={updateDraftPackage}
                    />
                    <span>cm</span>
                  </span>
                </label>

                <label>
                  Alto
                  <span className="measurement-input">
                    <input
                      name="heightCm"
                      type="number"
                      min="1"
                      placeholder="0"
                      value={draftPackage.heightCm || ''}
                      onChange={updateDraftPackage}
                    />
                    <span>cm</span>
                  </span>
                </label>

                <label>
                  Ancho
                  <span className="measurement-input">
                    <input
                      name="widthCm"
                      type="number"
                      min="1"
                      placeholder="0"
                      value={draftPackage.widthCm || ''}
                      onChange={updateDraftPackage}
                    />
                    <span>cm</span>
                  </span>
                </label>
              </div>

              <label className="product-weight-field">
                Peso en libras
                <span className="weight-input">
                  <input
                    name="weightLb"
                    type="number"
                    min="1"
                    placeholder="0"
                    value={draftPackage.weightLb || ''}
                    onChange={updateDraftPackage}
                  />
                  <span>libras</span>
                </span>
              </label>

              <label className="product-content-field">
                Contenido
                <input
                  name="content"
                  value={draftPackage.content}
                  onChange={updateDraftPackage}
                />
              </label>

              <button
                className="product-add-button"
                type="button"
                onClick={addPackage}
              >
                Agregar
                <i className="fi fi-rr-plus" aria-hidden="true" />
              </button>
            </section>

            <div className="added-products-list">
              {form.packages.map((item, index) => (
                <div className="added-product" key={index}>
                  <div className="added-product-value">
                    <strong>Peso en libras</strong>
                    <span>{item.weightLb} libras</span>
                  </div>

                  <div className="added-product-value added-product-content">
                    <strong>Contenido</strong>
                    <span>{item.content}</span>
                  </div>

                  <div className="product-box-icon" aria-hidden="true">
                    <i className="fi fi-rr-box" />
                  </div>

                  <div className="added-dimensions">
                    <div className="added-product-value">
                      <strong>Largo</strong>
                      <span>{item.lengthCm} <small>cm</small></span>
                    </div>

                    <div className="added-product-value">
                      <strong>Alto</strong>
                      <span>{item.heightCm} <small>cm</small></span>
                    </div>

                    <div className="added-product-value">
                      <strong>Ancho</strong>
                      <span>{item.widthCm} <small>cm</small></span>
                    </div>
                  </div>

                  <button
                    className="remove-package"
                    type="button"
                    aria-label={`Eliminar producto ${index + 1}`}
                    onClick={() => removePackage(index)}
                  >
                    <i className="fi fi-rr-trash" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}


        {error && <p className="form-error">{error}</p>}

        {step === 1 ? (
          <button className="button button-primary" type="submit">
            Siguiente
            <i className="fi fi-rr-arrow-small-right" aria-hidden="true" />
          </button>
        ) : (
          <div className="form-actions">
            <button
              className="button button-secondary"
              type="button"
              onClick={handleBack}
            >
              <i className="fi fi-rr-arrow-small-left" aria-hidden="true" />
              Regresar
            </button>

            <button className="button button-primary" type="submit">
              Enviar
              <i className="fi fi-rr-arrow-small-right" aria-hidden="true" />
            </button>
          </div>
        )}



      </form>
    </main>
  );
}
