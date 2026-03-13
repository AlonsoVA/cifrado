'use client';

import { useState } from 'react';
import { encrypt, decrypt } from '../utils/cryptoLogic';
import Documentation from '../components/Documentation';

export default function Home() {
  const [algorithm, setAlgorithm] = useState('AES-128');
  const [inputText, setInputText] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [copied, setCopied] = useState(false);

  const algorithms = [
    'AES-128',
    'AES-256',
    '3DES',
    'Twofish',
    'ChaCha20',
    'Blowfish',
  ];

  const handleEncrypt = async () => {
    setError('');
    setOutputText('');
    setIsLoading(true);
    setCopied(false);

    try {
      if (!inputText.trim()) {
        throw new Error('Por favor, ingresa un texto para cifrar');
      }
      if (!secretKey.trim()) {
        throw new Error('Por favor, ingresa una clave secreta');
      }

      const encrypted = encrypt(inputText, secretKey, algorithm);
      setOutputText(encrypted);
    } catch (err) {
      setError(err.message || 'Error al cifrar el texto');
      setOutputText('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecrypt = async () => {
    setError('');
    setOutputText('');
    setIsLoading(true);
    setCopied(false);

    try {
      if (!inputText.trim()) {
        throw new Error('Por favor, ingresa un texto cifrado para descifrar');
      }
      if (!secretKey.trim()) {
        throw new Error('Por favor, ingresa la clave secreta');
      }

      const decrypted = decrypt(inputText, secretKey, algorithm);
      setOutputText(decrypted);
    } catch (err) {
      setError(err.message || 'Error al descifrar el texto');
      setOutputText('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {
        setError('No se pudo copiar al portapapeles');
      });
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setError('');
    setCopied(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            Cifrado Simétrico
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Dashboard para cifrado y descifrado de texto
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8">
          {/* Algorithm Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Algoritmo de Cifrado
            </label>
            <select
              value={algorithm}
              onChange={(e) => {
                setAlgorithm(e.target.value);
                setOutputText('');
                setError('');
              }}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {algorithms.map((algo) => (
                <option key={algo} value={algo}>
                  {algo}
                </option>
              ))}
            </select>
          </div>

          {/* Secret Key Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Clave Secreta (Secret Key)
            </label>
            <input
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="Ingresa tu clave secreta"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              La misma clave se usa para cifrar y descifrar
            </p>
          </div>

          {/* Input Text Area */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Texto de Entrada (Input)
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ingresa el texto a cifrar o descifrar aquí..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={handleEncrypt}
              disabled={isLoading}
              className="flex-1 min-w-[120px] px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Procesando...' : '🔒 Cifrar'}
            </button>
            <button
              onClick={handleDecrypt}
              disabled={isLoading}
              className="flex-1 min-w-[120px] px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Procesando...' : '🔓 Descifrar'}
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              🗑️ Limpiar
            </button>
            <button
              onClick={() => setShowDocs(true)}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              📚 Documentación
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Output Text Area */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Resultado (Output)
              </label>
              {outputText && (
                <button
                  onClick={handleCopy}
                  className="px-4 py-1 text-sm bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all"
                >
                  {copied ? '✓ Copiado' : '📋 Copiar'}
                </button>
              )}
            </div>
            <textarea
              value={outputText}
              readOnly
              placeholder="El resultado aparecerá aquí..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 resize-none"
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Aplicación de cifrado simétrico desarrollada con Next.js y crypto-js
          </p>
        </div>
      </div>

      {/* Documentation Modal */}
      <Documentation isOpen={showDocs} onClose={() => setShowDocs(false)} />
    </main>
  );
}
