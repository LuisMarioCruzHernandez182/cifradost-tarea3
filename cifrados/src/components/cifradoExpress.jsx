import React, { useState } from 'react';
import Swal from 'sweetalert2';

const FormularioExpress = () => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    password: '',
    tarjetaCredito: '',
    clave: '',
  });

  const [errores, setErrores] = useState({});
  const [resultadosCifrado, setResultadosCifrado] = useState(null); // Datos cifrados
  const [datosDescifrados, setDatosDescifrados] = useState(null); // Datos descifrados
console.log(datosDescifrados)
  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    
    if (!formulario.nombre) nuevosErrores.nombre = 'El nombre es obligatorio.';
    if (!formulario.email) {
      nuevosErrores.email = 'El email es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formulario.email)) {
      nuevosErrores.email = 'El email no es válido.';
    }
    if (!formulario.telefono) nuevosErrores.telefono = 'El teléfono es obligatorio.';
    if (!formulario.direccion) nuevosErrores.direccion = 'La dirección es obligatoria.';
    if (!formulario.password) nuevosErrores.password = 'La contraseña es obligatoria.';
    if (!formulario.tarjetaCredito) {
      nuevosErrores.tarjetaCredito = 'El número de tarjeta de crédito es obligatorio.';
    } else if (!/^\d{16}$/.test(formulario.tarjetaCredito)) {
      nuevosErrores.tarjetaCredito = 'El número de tarjeta debe tener 16 dígitos.';
    }
    if (formulario.clave.length !== 16) {
      nuevosErrores.clave = 'La clave debe tener exactamente 16 caracteres.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      try {
        const response = await fetch('https://backend-express-amber.vercel.app/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userKey: formulario.clave,
            name: formulario.nombre,
            email: formulario.email,
            phone: formulario.telefono,
            address: formulario.direccion,
            creditCard: formulario.tarjetaCredito,
            password: formulario.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setResultadosCifrado(data.encryptedData); // Almacena datos cifrados
          Swal.fire('Éxito', 'Datos cifrados exitosamente', 'success'); // Alerta de éxito
        } else {
          Swal.fire('Error', 'Error al cifrar los datos: ' + data.error, 'error'); // Alerta de error
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        Swal.fire('Error', 'Ocurrió un error en la comunicación con el servidor.', 'error'); // Alerta de error en la conexión
      }
    }
  };

  const manejarDescifrado = async () => {
    if (resultadosCifrado) {
      try {
        const response = await fetch('https://backend-express-amber.vercel.app/decrypt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userKey: formulario.clave,
            encryptedEmail: resultadosCifrado.encryptedEmail,
            encryptedName: resultadosCifrado.encryptedName,
            encryptedAddress: resultadosCifrado.encryptedAddress,
            encryptedPhone: resultadosCifrado.encryptedPhone,
            encryptedCreditCard: resultadosCifrado.encryptedCreditCard,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          const datos = data.decryptedData;
          setDatosDescifrados(datos); // Almacena datos descifrados
        } else {
          Swal.fire('Error', 'Error al descifrar los datos: ' + data.error, 'error'); // Alerta de error
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        Swal.fire('Error', 'Ocurrió un error al intentar descifrar los datos.', 'error'); // Alerta de error en la conexión
      }
    } else {
      Swal.fire('Error', 'No hay datos cifrados para descifrar.', 'error'); // Alerta de error si no hay datos
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold text-center mb-4 dark:text-white">Cifrado y Descifrado de datos</h2>

      <form onSubmit={manejarSubmit}>
        {/* Clave */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Clave (16 caracteres)</label>
          <input
            type="text"
            name="clave"
            value={formulario.clave}
            onChange={manejarCambio}
            placeholder="Clave (16 caracteres)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            maxLength="16"
          />
          {errores.clave && <p className="text-red-500 text-sm">{errores.clave}</p>}
        </div>

        {/* Nombre */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            placeholder="Nombre"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          {errores.nombre && <p className="text-red-500 text-sm">{errores.nombre}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formulario.email}
            onChange={manejarCambio}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          {errores.email && <p className="text-red-500 text-sm">{errores.email}</p>}
        </div>

        {/* Teléfono */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={formulario.telefono}
            onChange={manejarCambio}
            placeholder="Teléfono"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          {errores.telefono && <p className="text-red-500 text-sm">{errores.telefono}</p>}
        </div>

        {/* Dirección */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formulario.direccion}
            onChange={manejarCambio}
            placeholder="Dirección"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          {errores.direccion && <p className="text-red-500 text-sm">{errores.direccion}</p>}
        </div>

        {/* Contraseña */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formulario.password}
            onChange={manejarCambio}
            placeholder="Contraseña"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          {errores.password && <p className="text-red-500 text-sm">{errores.password}</p>}
        </div>

        {/* Tarjeta de Crédito */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Tarjeta de Crédito</label>
          <input
            type="text"
            name="tarjetaCredito"
            value={formulario.tarjetaCredito}
            onChange={manejarCambio}
            placeholder="Número de tarjeta de crédito (16 dígitos)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            maxLength="16"
          />
          {errores.tarjetaCredito && <p className="text-red-500 text-sm">{errores.tarjetaCredito}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Cifrar
        </button>
      </form>

      <button
        onClick={manejarDescifrado}
        className="mt-4 w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
      >
        Descifrar
      </button>

      {/* Mostrar Datos Cifrados */}
      {resultadosCifrado && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-100">
          <h3 className="text-lg font-bold">Datos Cifrados:</h3>
          <div
              className="text-sm mt-2 dark:text-white overflow-auto"
              style={{ maxHeight: '200px', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
            >
              
                <p>
                  <strong>Nombre:</strong>
                  <span>{resultadosCifrado.encryptedName?.encryptedData}</span>
                </p>
                <p>
                  <strong>Email:</strong>
                  <span>{resultadosCifrado.encryptedEmail?.encryptedData}</span>
                </p>
                <p>
                  <strong>Direccion:</strong>
                  <span>{resultadosCifrado.encryptedAddress?.encryptedData}</span>
                </p>
                <p>
                  <strong>Telefono:</strong>
                  <span>{resultadosCifrado.encryptedPhone}</span>
                </p>
                <p>
                  <strong>Tarjeta de credito:</strong>
                  <span>{resultadosCifrado.encryptedCreditCard}</span>
                </p>
                <p>
                  <strong>Contraseña:</strong>
                  <span>{resultadosCifrado.digestCrypto}</span>
                </p>
            
            </div>
        </div>
      )}

      {/* Mostrar Datos Descifrados */}
      {datosDescifrados && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-100">
          <h3 className="text-lg font-bold">Datos Descifrados:</h3>
          
          <div
              className="text-sm mt-2 dark:text-white overflow-auto"
              style={{ maxHeight: '200px', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
            >
              
                <p>
                  <strong>Nombre:</strong>
                  <span>{datosDescifrados.decryptedName}</span>
                </p>
                <p>
                  <strong>Email:</strong>
                  <span>{datosDescifrados.decryptedEmail}</span>
                </p>
                <p>
                  <strong>Direccion:</strong>
                  <span>{datosDescifrados.decryptedAddress}</span>
                </p>
                <p>
                  <strong>Telefono:</strong>
                  <span>{datosDescifrados.decryptedPhone}</span>
                </p>
                <p>
                  <strong>Tarjeta de credito:</strong>
                  <span>{datosDescifrados.decryptedCreditCard}</span>
                </p>
                <p>
                  <strong>Contraseña:</strong>
                  <span>No es posible descifrar el hash</span>
                </p>
            
            </div>
        </div>
      )}
    </div>
  );
};

export default FormularioExpress;
