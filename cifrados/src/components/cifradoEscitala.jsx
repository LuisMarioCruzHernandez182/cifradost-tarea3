import React, { useState } from 'react';
import Swal from 'sweetalert2'; 
import { cifrarEscitala, descifrarEscitala } from '../functions/funciones';

const CifradoEscitala = ({ modoOscuro }) => {
  const [mensaje, setMensaje] = useState('');
  const [columnas, setColumnas] = useState(4); 
  const [cifrado, setCifrado] = useState('');
  const [descifrado, setDescifrado] = useState('');
  const [matriz, setMatriz] = useState([]);

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

    if (columnas === '' || isNaN(columnas)) {
      Swal.fire({
        title: 'Error',
        text: 'Debe ingresar un número de columnas válido',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (parseInt(columnas, 10) <= 0) {
      Swal.fire({
        title: 'Error',
        text: 'El número de columnas debe ser mayor a 0',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    const resultado = cifrarEscitala(mensaje, parseInt(columnas, 10));
    setCifrado(resultado.mensajeCifrado);
    setMatriz(resultado.matriz);
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

    if (columnas === '' || isNaN(columnas)) {
      Swal.fire({
        title: 'Error',
        text: 'Debe ingresar un número de columnas válido',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (parseInt(columnas, 10) <= 0) {
      Swal.fire({
        title: 'Error',
        text: 'El número de columnas debe ser mayor a 0',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    const resultado = descifrarEscitala(mensaje, parseInt(columnas, 10));
    setDescifrado(resultado);
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
    <div className={`max-w-lg mx-auto shadow-lg rounded-lg p-6 mt-6 ${modoOscuro ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <h2 className="text-2xl font-bold text-center mb-4">Cifrado Escítala</h2>

      <div className="mb-4">
        <label className="block font-semibold mb-2">
          Mensaje/Cifrado:
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
        <label className="block font-semibold mb-2">
          Número de columnas:
        </label>
        <input
          type="number"
          value={columnas}
          onChange={(e) => setColumnas(e.target.value)}
          placeholder="Número de columnas"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${modoOscuro ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
        />
      </div>

      <div className="flex justify-between space-x-4">
        <button
          onClick={manejarCifrado}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${modoOscuro ? 'hover:bg-blue-500' : ''}`}
        >
          Cifrar
        </button>
        <button
          onClick={manejarDescifrado}
          className={`w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${modoOscuro ? 'hover:bg-green-500' : ''}`}
        >
          Descifrar
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Texto cifrado:</h3>
        <div className="flex items-center">
          <p className={`p-4 rounded-lg mt-2 flex-grow ${modoOscuro ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}>
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

      {matriz.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Matriz generada:</h3>
          <div className={`grid grid-cols-${columnas} gap-2 mt-2`}>
            {matriz.map((fila, filaIndex) => (
              <div key={filaIndex} className="flex space-x-2">
                {fila.map((celda, celdaIndex) => (
                  <div
                    key={celdaIndex}
                    className={`w-12 h-12 flex items-center justify-center border border-gray-300 ${modoOscuro ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-700'}`}
                  >
                    {celda}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Texto descifrado:</h3>
        <div className="flex items-center">
          <p className={`p-4 rounded-lg mt-2 flex-grow ${modoOscuro ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}>
            {descifrado ? descifrado : 'No hay texto descifrado aún.'}
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

export default CifradoEscitala;
