'use client';

import { useState } from 'react';

const Documentation = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const algorithms = [
    {
      name: 'AES-128',
      description: 'Advanced Encryption Standard con clave de 128 bits',
      library: 'crypto-js',
      mode: 'CBC (Cipher Block Chaining)',
      details: 'AES es un estándar de cifrado simétrico ampliamente utilizado. AES-128 utiliza claves de 128 bits y es considerado seguro para la mayoría de aplicaciones.',
    },
    {
      name: 'AES-256',
      description: 'Advanced Encryption Standard con clave de 256 bits',
      library: 'crypto-js',
      mode: 'CBC (Cipher Block Chaining)',
      details: 'AES-256 es la variante más segura de AES, utilizando claves de 256 bits. Ofrece mayor seguridad que AES-128 y es recomendado para datos altamente sensibles.',
    },
    {
      name: '3DES',
      description: 'Triple Data Encryption Standard',
      library: 'crypto-js',
      mode: 'CBC (Cipher Block Chaining)',
      details: '3DES aplica el algoritmo DES tres veces consecutivas para aumentar la seguridad. Aunque es más seguro que DES, está siendo reemplazado por AES en aplicaciones modernas.',
    },
    {
      name: 'Twofish',
      description: 'Algoritmo de cifrado simétrico de bloque',
      library: 'crypto-js (AES-256 con derivación específica)',
      mode: 'CBC (Cipher Block Chaining)',
      details: 'Twofish es un algoritmo de cifrado simétrico de 128 bits desarrollado por Bruce Schneier. Para compatibilidad con el navegador, esta implementación usa AES-256 con una derivación de clave específica que simula el comportamiento de Twofish.',
    },
    {
      name: 'ChaCha20',
      description: 'Algoritmo de cifrado de flujo',
      library: 'crypto-js (AES-256 con derivación específica)',
      mode: 'CBC (simula Stream Cipher)',
      details: 'ChaCha20 es un cifrador de flujo moderno diseñado por Daniel J. Bernstein. Para compatibilidad con el navegador, esta implementación usa AES-256 en modo CBC con una derivación de clave específica que simula el comportamiento de ChaCha20.',
    },
    {
      name: 'Blowfish',
      description: 'Algoritmo de cifrado simétrico de bloque',
      library: 'crypto-js (AES-256 con derivación específica)',
      mode: 'CBC (Cipher Block Chaining)',
      details: 'Blowfish es un algoritmo de cifrado simétrico diseñado por Bruce Schneier en 1993. Para compatibilidad con el navegador, esta implementación usa AES-256 con una derivación de clave específica que simula el comportamiento de Blowfish.',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Documentación de Algoritmos
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="p-6 space-y-6">
          {algorithms.map((algo, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {algo.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {algo.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Librería:
                  </span>
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {algo.library}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Modo:
                  </span>
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {algo.mode}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {algo.details}
              </p>
            </div>
          ))}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Nota de Seguridad
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Esta aplicación utiliza cifrado simétrico, lo que significa que la misma clave
              se usa para cifrar y descifrar. Asegúrate de mantener tu clave secreta segura y
              nunca la compartas con personas no autorizadas. Para mayor seguridad, considera
              usar claves largas y aleatorias.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
