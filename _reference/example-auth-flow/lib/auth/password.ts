/**
 * Password hashing with bcrypt (cost factor 10).
 * Never store plaintext passwords. Never return hashes to the client.
 */

import { compare, hash } from 'bcryptjs'

const COST_FACTOR = 10

export async function hashPassword(plaintext: string): Promise<string> {
  return hash(plaintext, COST_FACTOR)
}

export async function verifyPassword(plaintext: string, hashValue: string): Promise<boolean> {
  return compare(plaintext, hashValue)
}
