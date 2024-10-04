import React from 'react';

const ComparacionFrameworks = ({ modoOscuro }) => {
  return (
    <div className={`p-8 rounded-lg shadow-lg w-full ${modoOscuro ? 'bg-gray-800' : 'bg-white'}`}>
      <h1 className={`text-2xl font-bold text-center mb-6 ${modoOscuro ? 'text-white' : 'text-black'}`}>
        Comparativa de Frameworks: Express.js vs Django
      </h1>
      <p className={`text-lg mb-4 ${modoOscuro ? 'text-gray-300' : 'text-gray-800'}`}>
        Este proyecto analiza métodos de cifrado utilizando <strong>Express.js</strong> y <strong>Django</strong>, comparando su implementación y rendimiento con los algoritmos <strong>Serpent</strong>, <strong>GOST R 34.11-94</strong> y <strong>RSA</strong>.
      </p>

      <div className="flex justify-between mb-6">
        <div className="w-1/2 pr-4">
          <h2 className={`text-xl font-semibold mb-2 ${modoOscuro ? 'text-white' : 'text-black'}`}>Express.js</h2>
          <p className={`mb-2 ${modoOscuro ? 'text-gray-300' : 'text-gray-800'}`}>
            Un framework ligero para Node.js que facilita operaciones de cifrado mediante la librería <strong>crypto</strong> y otras externas. Los métodos implementados son:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li className={`mb-2 ${modoOscuro ? 'text-gray-300' : 'text-gray-800'}`}>
              <strong>Cifrado Serpent:</strong> Cifra datos sensibles como <strong>nombre, dirección y correo electrónico</strong> mediante operaciones XOR.
            </li>
            <li className={`mb-2 ${modoOscuro ? 'text-gray-300' : 'text-gray-800'}`}> 
              <strong>Cifrado RSA:</strong> Protege <strong>números de teléfono y tarjetas de crédito</strong> utilizando claves públicas y privadas.
            </li>
            <li className={`mb-2 ${modoOscuro ? 'text-gray-300' : 'text-gray-800'}`}>
              <strong>Hash GOST R 34.11-94:</strong> Crea huellas digitales únicas de <strong>contraseñas</strong>, dificultando su descifrado.
            </li>
          </ul>
          <p className={`${modoOscuro ? 'text-gray-300' : 'text-gray-800'}`}>
            Express.js se destaca por su <strong>velocidad y eficacia</strong> en cifrado y descifrado asíncrono.
          </p>
        </div>

        <div className="w-1/2 pl-4">
          <h2 className={`text-xl font-semibold mb-2 ${modoOscuro ? 'text-white' : 'text-black'}`}>Django</h2>
          <p className={`mb-2 ${modoOscuro ? 'text-gray-300' : 'text-gray-800'}`}>
            Un framework robusto y escalable en Python que utiliza <strong>PyCryptodome</strong> para cifrado. Los métodos implementados incluyen:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li className={`mb-2 ${modoOscuro ? 'text-gray-300' : 'text-gray-800'}`}>
              <strong>Cifrado Serpent:</strong> Cifra <strong>nombre, dirección y correo electrónico</strong> usando operaciones XOR.
            </li>
            <li className={`mb-2 ${modoOscuro ? 'text-gray-300' : 'text-gray-800'}`}>
              <strong>Cifrado RSA:</strong> Protege <strong>números de teléfono y tarjetas de crédito</strong> con criptografía asimétrica.
            </li>
            <li className={`mb-2 ${modoOscuro ? 'text-gray-300' : 'text-gray-800'}`}>
              <strong>Hash GOST R 34.11-94:</strong> Utilizado para el hashing de <strong>contraseñas</strong>, generando huellas digitales únicas.
            </li>
          </ul>
          <p className={`${modoOscuro ? 'text-gray-300' : 'text-gray-800'}`}>
            Aunque Django ofrece un <strong>entorno estructurado</strong>, puede ser un poco más lento que Express.js.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <p className={`mt-4 ${modoOscuro ? 'text-gray-300' : 'text-gray-800'}`}>
          En resumen, la elección entre Express.js y Django dependerá de las necesidades específicas del proyecto, ya que cada uno presenta ventajas y desventajas. Para rendimiento y flexibilidad, Express.js es ideal; mientras que para robustez y facilidad de desarrollo, Django es la opción preferida.
        </p>
      </div>
    </div>
  );
};

export default ComparacionFrameworks;
