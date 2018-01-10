
import { stripeHandler } from './index.js';

let modulo;

const providers = {
  stripe: stripeHandler,
};

const handler = ({ provider, request }, promise) => {
  try {
    modulo = promise;
    const targetProvider = providers[provider];
    if (targetProvider) targetProvider({ body: request.body });
    modulo.resolve('Webhook received!');
  } catch (exception) {
    modulo.reject(`[handleWebhook.handler] ${exception}`);
  }
};

export const handleWebhook = (options) =>
new Promise((resolve, reject) =>
handler(options, { resolve, reject }));