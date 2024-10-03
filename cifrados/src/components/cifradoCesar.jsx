import React, { useState } from 'react';
import Swal from 'sweetalert2'; 
import { cifrarCesar, descifrarCesar } from '../functions/funciones';

const CifradoCesar = ({ modoOscuro }) => {
  const [mensaje, setMensaje] = useState('');
  const [clave, setClave] = useState(3); 
  const [cifrado, setCifrado] = useState('');
  const [descifrado, setDescifrado] = useState('');

  const manejarCifrado = () => {
    if (mensaje.trim() === '') {

      Swal.fire({
        title: 'Error',
        text: 'Debe ingresar un mensaje para cifrar',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (clave === '' || isNaN(clave)) {
      Swal.fire({
        title: 'Error',
        text: 'Debe ingresar un número de desplazamiento válido',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (parseInt(clave, 10) <= 0) {
      Swal.fire({
        title: 'Error',
        text: 'El número de desplazamiento debe ser mayor a 0',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    setCifrado(cifrarCesar(mensaje, parseInt(clave, 10)));
  };

  const manejarDescifrado = () => {
    if (mensaje.trim() === '') {
      Swal.fire({
        title: 'Error',
        text: 'Debe ingresar un mensaje para descifrar',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (clave === '' || isNaN(clave)) {
      Swal.fire({
        title: 'Error',
        text: 'Debe ingresar un número de desplazamiento válido',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (parseInt(clave, 10) <= 0) {
      Swal.fire({
        title: 'Error',
        text: 'El número de desplazamiento debe ser mayor a 0',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    setDescifrado(descifrarCesar(mensaje, parseInt(clave, 10)));
  };

  const copiarAlPortapapeles = (texto) => {
    navigator.clipboard.writeText(texto).then(() => {
      Swal.fire({
        title: '¡Éxito!',
        text: 'Texto copiado al portapapeles',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 1500,
      });
    });
  };

  return (
    <div className={`max-w-lg mx-auto shadow-lg rounded-lg p-6 mt-6 ${modoOscuro ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-2xl font-bold text-center mb-4 ${modoOscuro ? 'text-white' : 'text-gray-900'}`}>Cifrado César</h2>

      <div className="mb-4">
        <label className={`block font-semibold mb-2 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
          Mensaje:
        </label>
        <input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Ingrese el mensaje"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${modoOscuro ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
        />
      </div>

      <div className="mb-4">
        <label className={`block font-semibold mb-2 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
          Clave:
        </label>
        <input
          type="number"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          placeholder="Ingrese la clave"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${modoOscuro ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
        />
      </div>

      <div className="flex justify-between space-x-4">
        <button
          onClick={manejarCifrado}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          Cifrar
        </button>
        <button
          onClick={manejarDescifrado}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
        >
          Descifrar
        </button>
      </div>

      <div className="mt-6">
        <h3 className={`text-lg font-semibold ${modoOscuro ? 'text-gray-300' : 'text-gray-900'}`}>Texto cifrado:</h3>
        <div className="flex items-center">
          <p className={`bg-gray-100 p-4 rounded-lg mt-2 flex-grow ${modoOscuro ? 'bg-gray-700 text-white' : 'text-gray-700'}`}>
            {cifrado || 'No hay texto cifrado aún.'}
          </p>
          <button
            onClick={() => copiarAlPortapapeles(cifrado)}
            disabled={!cifrado}
            className={`ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors hover:bg-blue-600 ${!cifrado && 'opacity-50 cursor-not-allowed'}`}
          >
            Copiar
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h3 className={`text-lg font-semibold ${modoOscuro ? 'text-gray-300' : 'text-gray-900'}`}>Texto descifrado:</h3>
        <div className="flex items-center">
          <p className={`bg-gray-100 p-4 rounded-lg mt-2 flex-grow ${modoOscuro ? 'bg-gray-700 text-white' : 'text-gray-700'}`}>
            {descifrado || 'No hay texto descifrado aún.'}
          </p>
          <button
            onClick={() => copiarAlPortapapeles(descifrado)}
            disabled={!descifrado}
            className={`ml-4 bg-green-500 text-white px-4 py-2 rounded-lg transition-colors hover:bg-green-600 ${!descifrado && 'opacity-50 cursor-not-allowed'}`}
          >
            Copiar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CifradoCesar;
