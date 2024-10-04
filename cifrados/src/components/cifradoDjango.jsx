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
console.log(resultadosCifrado)
  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };
console.log(resultadosCifrado)
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
        const response = await fetch('https://cifradost-tarea3.onrender.com/encryption/submit/', {
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
          setResultadosCifrado({
            encryptedName: data.encryptedName,
            encryptedEmail: data.encryptedEmail,
            encryptedAddress: data.encryptedAddress,
            encryptedCreditCard: data.encryptedCreditCard,
            encryptedPhone: data.encryptedPhone,
            hashPassword: data.hashPassword, // Almacena el hash de la contraseña
          }); 
          Swal.fire('Éxito', 'Datos cifrados exitosamente', 'success');
        } else {
          Swal.fire('Error', 'Error al cifrar los datos: ' + data.error, 'error');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        Swal.fire('Error', 'Ocurrió un error en la comunicación con el servidor.', 'error');
      }
    }
  };

  const manejarDescifrado = async () => {
    if (resultadosCifrado) {
      try {
        const response = await fetch('https://cifradost-tarea3.onrender.com/encryption/decrypt/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userKey: formulario.clave,
            encryptedName: resultadosCifrado.encryptedName,
            encryptedAddress: resultadosCifrado.encryptedAddress,
            encryptedEmail: resultadosCifrado.encryptedEmail,
            encryptedCreditCard: resultadosCifrado.encryptedCreditCard,
            encryptedPhone: resultadosCifrado.encryptedPhone,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setDatosDescifrados({
            decryptedName: data.decryptedName,
            decryptedEmail: data.decryptedEmail,
            decryptedAddress: data.decryptedAddress,
            decryptedPhone: data.decryptedPhone,
            decryptedCreditCard: data.decryptedCreditCard,
          });
        } else {
          Swal.fire('Error', 'Error al descifrar los datos: ' + data.error, 'error');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        Swal.fire('Error', 'Ocurrió un error al intentar descifrar los datos.', 'error');
      }
    } else {
      Swal.fire('Error', 'No hay datos cifrados para descifrar.', 'error');
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
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Número de Tarjeta de Crédito</label>
          <input
            type="text"
            name="tarjetaCredito"
            value={formulario.tarjetaCredito}
            onChange={manejarCambio}
            placeholder="Número de Tarjeta de Crédito (16 dígitos)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            maxLength="16"
          />
          {errores.tarjetaCredito && <p className="text-red-500 text-sm">{errores.tarjetaCredito}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Cifrar Datos
        </button>
      </form>

      {resultadosCifrado && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Resultados de Cifrado:</h3>
          <div
              className="text-sm mt-2 dark:text-white overflow-auto"
              style={{ maxHeight: '200px', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
            >
              
                <p>
                  <strong>Nombre:</strong>
                  <span>{resultadosCifrado.encryptedName}</span>
                </p>
                <p>
                  <strong>Email:</strong>
                  <span>{resultadosCifrado.encryptedEmail}</span>
                </p>
                <p>
                  <strong>Direccion:</strong>
                  <span>{resultadosCifrado.decryptedAddress}</span>
                </p>
                <p>
                  <strong>Telefono:</strong>
                  <span>{resultadosCifrado.encryptedPhone
                  }</span>
                </p>
                <p>
                  <strong>Tarjeta de credito:</strong>
                  <span>{resultadosCifrado.encryptedCreditCard}</span>
                </p>
                <p>
                  <strong>Contraseña:</strong>
                  <span>{resultadosCifrado.hashPassword}</span>
                </p>
            
            </div>
          <button
            onClick={manejarDescifrado}
            className="mt-2 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Descifrar Datos
          </button>
        </div>
      )}

      {datosDescifrados && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Resultados de Descifrado:</h3>
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
