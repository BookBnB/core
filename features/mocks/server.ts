import { setupServer } from 'msw/node';
import { buildHandlers } from './handlers'

export function buildServer() {
    const handlers = buildHandlers();
    return setupServer(...handlers);
}
