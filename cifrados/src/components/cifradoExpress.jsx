import React, { useState } from 'react';

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

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      alert('Formulario enviado correctamente');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold text-center mb-4 dark:text-white">Cifrado de datos con Express</h2>

      <form onSubmit={manejarSubmit}>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={formulario.telefono}
              onChange={manejarCambio}
              placeholder="Teléfono"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            {errores.telefono && <p className="text-red-500 text-sm">{errores.telefono}</p>}
          </div>

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
        </div>

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

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Tarjeta de Crédito</label>
          <input
            type="text"
            name="tarjetaCredito"
            value={formulario.tarjetaCredito}
            onChange={manejarCambio}
            placeholder="Número de tarjeta de crédito"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            maxLength="16"
          />
          {errores.tarjetaCredito && <p className="text-red-500 text-sm">{errores.tarjetaCredito}</p>}
        </div>

        <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
        Cifrar
        </button>

      </form>
    </div>
  );
};

export default FormularioExpress;
