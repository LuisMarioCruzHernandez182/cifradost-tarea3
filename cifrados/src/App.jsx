import React, { useState } from 'react';
import CifradoCesar from './components/cifradoCesar';
import CifradoEscitala from './components/cifradoEscitala';
import FormularioExpress from './components/cifradoExpress';
import FormularioDjango from './components/cifradoDjango';
import AcercaDe from './components/acercaDe'; // Asegúrate de importar el nuevo componente

function App() {
  const [componenteActivo, setComponenteActivo] = useState('cesar');
  const [modoOscuro, setModoOscuro] = useState(false);

  const toggleDarkMode = () => {
    setModoOscuro(!modoOscuro);
  };

  return (
    <div className={`${modoOscuro ? 'dark' : ''} min-h-screen ${modoOscuro ? 'bg-black' : 'bg-gray-100'}`}>
      <header className="bg-blue-600 dark:bg-gray-800 text-white py-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Aplicación de Cifrados</h1>
          <button
            onClick={toggleDarkMode}
            className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white py-1 px-3 rounded-lg"
          >
            {modoOscuro ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto mt-8 px-4">
        <div className="flex justify-center space-x-4 mb-8"> {/* Añadido justify-center para centrar los botones */}
          <button
            onClick={() => setComponenteActivo('cesar')}
            className={`py-2 px-4 rounded-lg ${componenteActivo === 'cesar' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Cifrado César
          </button>
          <button
            onClick={() => setComponenteActivo('escitala')}
            className={`py-2 px-4 rounded-lg ${componenteActivo === 'escitala' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Cifrado Escítala
          </button>
          <button
            onClick={() => setComponenteActivo('express')}
            className={`py-2 px-4 rounded-lg ${componenteActivo === 'express' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Cifrado Express
          </button>
          <button
            onClick={() => setComponenteActivo('django')}
            className={`py-2 px-4 rounded-lg ${componenteActivo === 'django' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Cifrado Django
          </button>
          <button
            onClick={() => setComponenteActivo('acerca')}
            className={`py-2 px-4 rounded-lg ${componenteActivo === 'acerca' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Acerca de
          </button>
        </div>

        <div>
          {componenteActivo === 'cesar' && <CifradoCesar modoOscuro={modoOscuro} />}
          {componenteActivo === 'escitala' && <CifradoEscitala modoOscuro={modoOscuro} />}
          {componenteActivo === 'express' && <FormularioExpress />}
          {componenteActivo === 'django' && <FormularioDjango />}
          {componenteActivo === 'acerca' && <AcercaDe />}
        </div>
      </div>
    </div>
  );
}

export default App;
