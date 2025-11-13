import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { randomBytes } from 'node:crypto'

const BCRYPT_SALT_ROUNDS = 10
const DEFAULT_TOKEN_TTL = '2h'

const AUTH_SECRET_GLOBAL_KEY = Symbol.for('app.auth.secret')

function getGlobalAuthSecretStore(): { value?: string } {
  const globalObject = globalThis as Record<symbol, { value?: string }>
  if (!globalObject[AUTH_SECRET_GLOBAL_KEY]) {
    globalObject[AUTH_SECRET_GLOBAL_KEY] = {}
  }
  return globalObject[AUTH_SECRET_GLOBAL_KEY]
}

function resolveAuthSecret(): string {
  const fromEnv = process.env.AUTH_SECRET
  if (fromEnv) {
    return fromEnv
  }

  if (process.env.NODE_ENV !== 'production') {
    const store = getGlobalAuthSecretStore()
    if (!store.value) {
      store.value = randomBytes(32).toString('hex')
      console.warn(
        '[auth] AUTH_SECRET non défini. Utilisation d’un secret temporaire pour le développement.'
      )
    }
    return store.value
  }

  throw new Error('AUTH_SECRET must be set to sign authentication tokens')
}

export async function hashPassword(plainPassword: string) {
  return bcrypt.hash(plainPassword, BCRYPT_SALT_ROUNDS)
}

export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
) {
  if (!hashedPassword) {
    return false
  }

  return bcrypt.compare(plainPassword, hashedPassword)
}

interface SessionPayload {
  sub: string
  email: string
  name?: string | null
}

export function signSessionToken(
  payload: SessionPayload,
  options?: jwt.SignOptions
) {
  const secret = resolveAuthSecret()

  return jwt.sign(payload, secret, {
    expiresIn: DEFAULT_TOKEN_TTL,
    ...options
  })
}

export function getAuthSecret() {
  return resolveAuthSecret()
}

