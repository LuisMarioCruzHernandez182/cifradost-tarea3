import React from 'react';

const AcercaDe = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4 dark:text-white">Acerca de los métodos de cifrado</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold dark:text-gray-300">Cifrado César:</h3>
        <p className="text-gray-700 dark:text-gray-200">
          El Cifrado César es una técnica de cifrado por sustitución en la que cada letra del texto claro se sustituye por otra letra que se encuentra un número fijo de posiciones más adelante en el alfabeto. 
          Por ejemplo, con un desplazamiento de 3, A se convierte en D, B se convierte en E, etc. Es uno de los métodos de cifrado más simples y conocidos.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold dark:text-gray-300">Escítala:</h3>
        <p className="text-gray-700 dark:text-gray-200">
          La Escítala es un método de cifrado antiguo utilizado por los espartanos. Consiste en escribir un mensaje en una tira de papel que se enrolla alrededor de un bastón de un diámetro específico. 
          Solo alguien que tenga un bastón del mismo diámetro puede desenrollar el mensaje y leerlo. Este método permite enviar mensajes secretos de manera efectiva.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold dark:text-gray-300">Cifrado Simétrico:</h3>
        <p className="text-gray-700 dark:text-gray-200">
          El cifrado simétrico utiliza la misma clave para cifrar y descifrar la información. Esto significa que tanto el emisor como el receptor deben tener acceso a la misma clave secreta. 
          Ejemplos de algoritmos de cifrado simétrico incluyen AES (Advanced Encryption Standard) y DES (Data Encryption Standard).
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold dark:text-gray-300">Cifrado Asimétrico (RSA):</h3>
        <p className="text-gray-700 dark:text-gray-200">
          El cifrado asimétrico utiliza un par de claves: una clave pública y una clave privada. La clave pública se utiliza para cifrar los mensajes, mientras que la clave privada se utiliza para descifrarlos. 
          El algoritmo RSA (Rivest-Shamir-Adleman) es uno de los métodos más conocidos de cifrado asimétrico y se utiliza comúnmente para la seguridad en las comunicaciones en línea.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold dark:text-gray-300">Hash (GOST R 34.11-94):</h3>
        <p className="text-gray-700 dark:text-gray-200">
          GOST R 34.11-94 es un algoritmo de hash criptográfico que forma parte de los estándares de cifrado rusos. Produce un valor de hash de 256 bits y se utiliza para garantizar la integridad de los datos. 
          Al igual que otros algoritmos de hash, como SHA-256, el hash de GOST es irreversible, lo que significa que no se puede obtener el mensaje original a partir del hash.
        </p>
      </div>
    </div>
  );
};

export default AcercaDe;
