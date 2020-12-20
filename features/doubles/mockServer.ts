import { setupServer } from 'msw/node';
import { buildHandlers } from './handlers'

export const mockServer = setupServer(...buildHandlers())
