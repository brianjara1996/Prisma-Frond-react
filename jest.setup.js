// jest.setup.js
import '@testing-library/jest-dom';

// Importa fetch para Node.js
import fetch, { Headers, Request, Response } from 'node-fetch';

// Si fetch no está disponible en el objeto global (usual en JSDOM con Jest)
if (!globalThis.fetch) {
    globalThis.fetch = fetch;
    globalThis.Response = Response;
    globalThis.Headers = Headers;
    globalThis.Request = Request;
}

global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

// Otras configuraciones globales que necesites
jest.setTimeout(1000000);  // Por ejemplo, establecer un tiempo de espera más largo para las pruebas
