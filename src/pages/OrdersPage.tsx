import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import type { Order } from '../types';

type DateFilters = {
  startDate: string;
  endDate: string;
};

const initialFilters: DateFilters = {
  startDate: '',
  endDate: '',
};

function formatMonth(dateValue: string) {
  const [, month] = dateValue.split('-').map(Number);
  const monthName = new Intl.DateTimeFormat('es-SV', {
    month: 'long',
  }).format(new Date(2020, month - 1, 1));

  return monthName.charAt(0).toUpperCase() + monthName.slice(1);
}

function getDateRangeLabel(filters: DateFilters) {
  if (filters.startDate && filters.endDate) {
    return `${formatMonth(filters.startDate)} - ${formatMonth(
      filters.endDate,
    )}`;
  }

  if (filters.startDate) {
    return `Desde ${formatMonth(filters.startDate)}`;
  }

  if (filters.endDate) {
    return `Hasta ${formatMonth(filters.endDate)}`;
  }

  return 'Seleccionar fechas';
}

function escapeCsv(value: unknown) {
  const text = String(value ?? '');
  const safeText = /^[=+\-@]/.test(text) ? `'${text}` : text;

  return `"${safeText.replace(/"/g, '""')}"`;
}

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [draftFilters, setDraftFilters] =
    useState<DateFilters>(initialFilters);

  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showDateFilters, setShowDateFilters] = useState(false);

  useEffect(() => {
    api
      .get<Order[]>('/orders')
      .then(({ data }) => {
        setOrders(data);
      })
      .catch(() => {
        setError('No se pudo cargar el historial de envíos.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);


  const allVisibleOrdersSelected =
    orders.length > 0 &&
    orders.every((order) =>
      selectedOrderIds.includes(order.id),
    );

  async function handleSearch() {
    setError('');

    if (
      draftFilters.startDate &&
      draftFilters.endDate &&
      draftFilters.startDate > draftFilters.endDate
    ) {
      setError('La fecha inicial no puede ser posterior a la fecha final.');
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await api.get<Order[]>('/orders', {
        params: {
          from: draftFilters.startDate || undefined,
          to: draftFilters.endDate || undefined,
        },
      });

      setOrders(data);
      setSelectedOrderIds([]);
      setShowDateFilters(false);
    } catch {
      setError('No se pudo buscar el historial de envíos.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleSelectAll() {
    const visibleIds = orders.map((order) => order.id);

    if (allVisibleOrdersSelected) {
      setSelectedOrderIds((current) =>
        current.filter((id) => !visibleIds.includes(id)),
      );
      return;
    }

    setSelectedOrderIds((current) => [
      ...new Set([...current, ...visibleIds]),
    ]);
  }

  function handleSelectOrder(orderId: string) {
    setSelectedOrderIds((current) =>
      current.includes(orderId)
        ? current.filter((id) => id !== orderId)
        : [...current, orderId],
    );
  }

  function handleDownloadCsv() {
    setError('');

    const ordersToDownload =
      selectedOrderIds.length > 0
        ? orders.filter((order) =>
          selectedOrderIds.includes(order.id),
        )
        : orders;

    if (ordersToDownload.length === 0) {
      setError('No hay envíos disponibles para descargar.');
      return;
    }

    const headers = [
      'No. de orden',
      'Nombre',
      'Apellidos',
      'Correo electrónico',
      'Teléfono',
      'Dirección de recolección',
      'Dirección del destinatario',
      'Departamento',
      'Municipio',
      'Fecha programada',
      'Estado',
      'Cantidad de paquetes',
      'Contenido',
    ];

    const rows = ordersToDownload.map((order) => [
      order.orderNumber,
      order.recipient.firstName,
      order.recipient.lastName,
      order.recipient.email,
      `${order.recipient.phoneCountryCode} ${order.recipient.phoneNumber}`,
      order.pickupAddress,
      order.recipient.address,
      order.recipient.department,
      order.recipient.municipality,
      order.scheduledDate.slice(0, 10),
      order.status,
      order.packageCount,
      order.packages.map((item) => item.content).join(' | '),
    ]);

    const csvContent = [
      headers.map(escapeCsv).join(','),
      ...rows.map((row) => row.map(escapeCsv).join(',')),
    ].join('\n');

    const csvFile = new Blob([`\uFEFF${csvContent}`], {
      type: 'text/csv;charset=utf-8',
    });

    const downloadUrl = URL.createObjectURL(csvFile);
    const downloadLink = document.createElement('a');

    downloadLink.href = downloadUrl;
    downloadLink.download = `envios-boxful-${new Date().toISOString().split('T')[0]
      }.csv`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    URL.revokeObjectURL(downloadUrl);
  }

  return (
    <main className="orders-page history-page">
      <section className="history-toolbar">
        <div className="date-range-picker">
          <button
            className="date-range-trigger"
            type="button"
            aria-expanded={showDateFilters}
            onClick={() => setShowDateFilters((open) => !open)}
          >
            <span>{getDateRangeLabel(draftFilters)}</span>
            <i className="fi fi-rr-calendar" aria-hidden="true" />
          </button>

          {showDateFilters && (
            <div className="date-range-popover">
              <label>
                Fecha inicial
                <span className="date-filter-input">
                  <input
                    type="date"
                    aria-label="Fecha inicial"
                    value={draftFilters.startDate}
                    onChange={(event) =>
                      setDraftFilters((current) => ({
                        ...current,
                        startDate: event.target.value,
                      }))
                    }
                  />
                  <i className="fi fi-rr-calendar" aria-hidden="true" />
                </span>
              </label>

              <label>
                Fecha final
                <span className="date-filter-input">
                  <input
                    type="date"
                    aria-label="Fecha final"
                    value={draftFilters.endDate}
                    onChange={(event) =>
                      setDraftFilters((current) => ({
                        ...current,
                        endDate: event.target.value,
                      }))
                    }
                  />
                  <i className="fi fi-rr-calendar" aria-hidden="true" />
                </span>
              </label>
            </div>
          )}
        </div>

        <button
          className="history-search-button"
          type="button"
          onClick={handleSearch}
        >
          Buscar
        </button>

        <button
          className="history-download-button"
          type="button"
          onClick={handleDownloadCsv}
        >
          Descargar órdenes
        </button>
      </section>

      {error && <p className="form-error history-error">{error}</p>}

      <section className="orders-table-container">
        {isLoading ? (
          <p className="history-message">Cargando envíos...</p>
        ) : orders.length === 0 ? (
          <p className="history-message">
            No se encontraron envíos para las fechas seleccionadas.
          </p>
        ) : (
          <div className="orders-table-scroll">
            <table className="orders-table">
              <thead>
                <tr>
                  <th className="selection-column">
                    <input
                      type="checkbox"
                      aria-label="Seleccionar todos los envíos"
                      checked={allVisibleOrdersSelected}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>No. de orden</th>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Departamento</th>
                  <th>Municipio</th>
                  <th>Paquetes en orden</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="selection-column">
                      <input
                        type="checkbox"
                        aria-label={`Seleccionar orden ${order.orderNumber}`}
                        checked={selectedOrderIds.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                      />
                    </td>
                    <td>
                      <strong>{order.orderNumber}</strong>
                    </td>
                    <td>{order.recipient.firstName}</td>
                    <td>{order.recipient.lastName}</td>
                    <td>{order.recipient.department}</td>
                    <td>{order.recipient.municipality}</td>
                    <td>
                      <span className="package-count">
                        {order.packageCount}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
