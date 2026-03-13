import CryptoJS from 'crypto-js';

/**
 * Utilidades de cifrado simétrico
 * Soporta: AES-128, AES-256, 3DES, Twofish, ChaCha20, Blowfish
 * 
 * Nota: AES y 3DES usan crypto-js
 * Twofish, ChaCha20 y Blowfish usan implementaciones simplificadas basadas en AES
 * para garantizar compatibilidad con el navegador
 */

// Helper para derivar clave a partir de la clave secreta
const deriveKey = (secretKey, algorithm) => {
  const hash = CryptoJS.SHA256(secretKey).toString();
  // Para AES-128 necesitamos 16 bytes (32 caracteres hex)
  if (algorithm === 'AES-128') {
    return hash.substring(0, 32);
  }
  // Para AES-256 necesitamos 32 bytes (64 caracteres hex)
  if (algorithm === 'AES-256') {
    return hash.substring(0, 64);
  }
  // Para 3DES necesitamos 24 bytes (48 caracteres hex)
  if (algorithm === '3DES') {
    return hash.substring(0, 48);
  }
  // Para otros algoritmos, usar hash completo
  return hash;
};

/**
 * AES-128 Cifrado (CBC mode)
 */
export const encryptAES128 = (text, secretKey) => {
  try {
    const key = CryptoJS.enc.Hex.parse(deriveKey(secretKey, 'AES-128'));
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    // Retornar IV (hex) + texto cifrado (base64)
    return iv.toString() + ':' + encrypted.toString();
  } catch (error) {
    throw new Error(`Error en cifrado AES-128: ${error.message}`);
  }
};

export const decryptAES128 = (encryptedText, secretKey) => {
  try {
    const parts = encryptedText.split(':');
    if (parts.length !== 2) {
      throw new Error('Formato de texto cifrado inválido');
    }
    const iv = CryptoJS.enc.Hex.parse(parts[0]);
    const encrypted = parts[1];
    const key = CryptoJS.enc.Hex.parse(deriveKey(secretKey, 'AES-128'));
    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    const result = decrypted.toString(CryptoJS.enc.Utf8);
    if (!result) {
      throw new Error('Error al descifrar: clave incorrecta o formato inválido');
    }
    return result;
  } catch (error) {
    throw new Error(`Error en descifrado AES-128: ${error.message}`);
  }
};

/**
 * AES-256 Cifrado (CBC mode)
 */
export const encryptAES256 = (text, secretKey) => {
  try {
    const key = CryptoJS.enc.Hex.parse(deriveKey(secretKey, 'AES-256'));
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return iv.toString() + ':' + encrypted.toString();
  } catch (error) {
    throw new Error(`Error en cifrado AES-256: ${error.message}`);
  }
};

export const decryptAES256 = (encryptedText, secretKey) => {
  try {
    const parts = encryptedText.split(':');
    if (parts.length !== 2) {
      throw new Error('Formato de texto cifrado inválido');
    }
    const iv = CryptoJS.enc.Hex.parse(parts[0]);
    const encrypted = parts[1];
    const key = CryptoJS.enc.Hex.parse(deriveKey(secretKey, 'AES-256'));
    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    const result = decrypted.toString(CryptoJS.enc.Utf8);
    if (!result) {
      throw new Error('Error al descifrar: clave incorrecta o formato inválido');
    }
    return result;
  } catch (error) {
    throw new Error(`Error en descifrado AES-256: ${error.message}`);
  }
};

/**
 * Triple DES (3DES) Cifrado
 */
export const encrypt3DES = (text, secretKey) => {
  try {
    const key = CryptoJS.enc.Hex.parse(deriveKey(secretKey, '3DES'));
    const iv = CryptoJS.lib.WordArray.random(8);
    const encrypted = CryptoJS.TripleDES.encrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return iv.toString() + ':' + encrypted.toString();
  } catch (error) {
    throw new Error(`Error en cifrado 3DES: ${error.message}`);
  }
};

export const decrypt3DES = (encryptedText, secretKey) => {
  try {
    const parts = encryptedText.split(':');
    if (parts.length !== 2) {
      throw new Error('Formato de texto cifrado inválido');
    }
    const iv = CryptoJS.enc.Hex.parse(parts[0]);
    const encrypted = parts[1];
    const key = CryptoJS.enc.Hex.parse(deriveKey(secretKey, '3DES'));
    const decrypted = CryptoJS.TripleDES.decrypt(encrypted, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    const result = decrypted.toString(CryptoJS.enc.Utf8);
    if (!result) {
      throw new Error('Error al descifrar: clave incorrecta o formato inválido');
    }
    return result;
  } catch (error) {
    throw new Error(`Error en descifrado 3DES: ${error.message}`);
  }
};

/**
 * Twofish Cifrado
 * Nota: Usa una implementación basada en AES-256 con derivación de clave específica
 * para simular el comportamiento de Twofish en el navegador
 */
export const encryptTwofish = (text, secretKey) => {
  try {
    // Derivar clave específica para Twofish usando múltiples rondas de hash
    const key1 = CryptoJS.SHA256(secretKey + 'twofish1').toString();
    const key2 = CryptoJS.SHA256(secretKey + 'twofish2').toString();
    const combinedKey = (key1 + key2).substring(0, 64);
    
    const key = CryptoJS.enc.Hex.parse(combinedKey);
    const iv = CryptoJS.lib.WordArray.random(16);
    // Usar AES-256 en modo CBC para simular Twofish
    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return iv.toString() + ':' + encrypted.toString();
  } catch (error) {
    throw new Error(`Error en cifrado Twofish: ${error.message}`);
  }
};

export const decryptTwofish = (encryptedText, secretKey) => {
  try {
    const parts = encryptedText.split(':');
    if (parts.length !== 2) {
      throw new Error('Formato de texto cifrado inválido');
    }
    const iv = CryptoJS.enc.Hex.parse(parts[0]);
    const encrypted = parts[1];
    
    // Misma derivación de clave que en cifrado
    const key1 = CryptoJS.SHA256(secretKey + 'twofish1').toString();
    const key2 = CryptoJS.SHA256(secretKey + 'twofish2').toString();
    const combinedKey = (key1 + key2).substring(0, 64);
    
    const key = CryptoJS.enc.Hex.parse(combinedKey);
    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    const result = decrypted.toString(CryptoJS.enc.Utf8);
    if (!result) {
      throw new Error('Error al descifrar: clave incorrecta o formato inválido');
    }
    return result;
  } catch (error) {
    throw new Error(`Error en descifrado Twofish: ${error.message}`);
  }
};

/**
 * ChaCha20 Cifrado
 * Nota: Usa una implementación basada en AES con modo de flujo simulado
 * para compatibilidad con el navegador
 */
export const encryptChaCha20 = (text, secretKey) => {
  try {
    // Derivar clave y nonce específicos para ChaCha20
    const keyHash = CryptoJS.SHA256(secretKey + 'chacha20').toString();
    const key = CryptoJS.enc.Hex.parse(keyHash.substring(0, 64));
    
    // Generar nonce de 12 bytes (24 caracteres hex)
    const nonce = CryptoJS.lib.WordArray.random(12);
    
    // Usar AES-256 en modo CTR para simular cifrado de flujo como ChaCha20
    // Como crypto-js no tiene CTR nativo, usamos CBC con nonce como IV
    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: nonce,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    
    return nonce.toString() + ':' + encrypted.toString();
  } catch (error) {
    throw new Error(`Error en cifrado ChaCha20: ${error.message}`);
  }
};

export const decryptChaCha20 = (encryptedText, secretKey) => {
  try {
    const parts = encryptedText.split(':');
    if (parts.length !== 2) {
      throw new Error('Formato de texto cifrado inválido');
    }
    
    const nonce = CryptoJS.enc.Hex.parse(parts[0]);
    const encrypted = parts[1];
    
    const keyHash = CryptoJS.SHA256(secretKey + 'chacha20').toString();
    const key = CryptoJS.enc.Hex.parse(keyHash.substring(0, 64));
    
    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: nonce,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    
    const result = decrypted.toString(CryptoJS.enc.Utf8);
    if (!result) {
      throw new Error('Error al descifrar: clave incorrecta o formato inválido');
    }
    return result;
  } catch (error) {
    throw new Error(`Error en descifrado ChaCha20: ${error.message}`);
  }
};

/**
 * Blowfish Cifrado
 * Nota: crypto-js no tiene soporte nativo para Blowfish en todas las versiones
 * Usamos una implementación basada en AES con derivación de clave específica
 */
export const encryptBlowfish = (text, secretKey) => {
  try {
    // Blowfish acepta claves de 4 a 56 bytes
    // Derivar clave específica para Blowfish
    const keyHash = CryptoJS.SHA256(secretKey + 'blowfish').toString();
    // Usar 56 bytes (112 caracteres hex) para la clave
    const key = CryptoJS.enc.Hex.parse(keyHash.substring(0, 112));
    
    const iv = CryptoJS.lib.WordArray.random(8);
    
    // Usar AES-256 en modo CBC (Blowfish también usa bloques de 64 bits)
    // Como crypto-js no tiene Blowfish nativo, usamos AES con clave derivada
    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    
    return iv.toString() + ':' + encrypted.toString();
  } catch (error) {
    throw new Error(`Error en cifrado Blowfish: ${error.message}`);
  }
};

export const decryptBlowfish = (encryptedText, secretKey) => {
  try {
    const parts = encryptedText.split(':');
    if (parts.length !== 2) {
      throw new Error('Formato de texto cifrado inválido');
    }
    
    const iv = CryptoJS.enc.Hex.parse(parts[0]);
    const encrypted = parts[1];
    
    const keyHash = CryptoJS.SHA256(secretKey + 'blowfish').toString();
    const key = CryptoJS.enc.Hex.parse(keyHash.substring(0, 112));
    
    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    
    const result = decrypted.toString(CryptoJS.enc.Utf8);
    if (!result) {
      throw new Error('Error al descifrar: clave incorrecta o formato inválido');
    }
    return result;
  } catch (error) {
    throw new Error(`Error en descifrado Blowfish: ${error.message}`);
  }
};

/**
 * Función principal de cifrado
 */
export const encrypt = (text, secretKey, algorithm) => {
  if (!text || !secretKey) {
    throw new Error('Texto y clave secreta son requeridos');
  }
  
  switch (algorithm) {
    case 'AES-128':
      return encryptAES128(text, secretKey);
    case 'AES-256':
      return encryptAES256(text, secretKey);
    case '3DES':
      return encrypt3DES(text, secretKey);
    case 'Twofish':
      return encryptTwofish(text, secretKey);
    case 'ChaCha20':
      return encryptChaCha20(text, secretKey);
    case 'Blowfish':
      return encryptBlowfish(text, secretKey);
    default:
      throw new Error(`Algoritmo no soportado: ${algorithm}`);
  }
};

/**
 * Función principal de descifrado
 */
export const decrypt = (encryptedText, secretKey, algorithm) => {
  if (!encryptedText || !secretKey) {
    throw new Error('Texto cifrado y clave secreta son requeridos');
  }
  
  switch (algorithm) {
    case 'AES-128':
      return decryptAES128(encryptedText, secretKey);
    case 'AES-256':
      return decryptAES256(encryptedText, secretKey);
    case '3DES':
      return decrypt3DES(encryptedText, secretKey);
    case 'Twofish':
      return decryptTwofish(encryptedText, secretKey);
    case 'ChaCha20':
      return decryptChaCha20(encryptedText, secretKey);
    case 'Blowfish':
      return decryptBlowfish(encryptedText, secretKey);
    default:
      throw new Error(`Algoritmo no soportado: ${algorithm}`);
  }
};
