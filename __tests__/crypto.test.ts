import { describe, it, expect } from 'vitest'
import { hashPassword } from '../utilities/crypto'

describe('Crypto Utility', () => {
    it('generates consistent hashes for the same password', async () => {
        const hash1 = await hashPassword('password123');
        const hash2 = await hashPassword('password123');
        expect(hash1).toBe(hash2);
    })

    it('generates different hashes for different passwords', async () => {
        const hash1 = await hashPassword('password123');
        const hash2 = await hashPassword('password124');
        expect(hash1).not.toBe(hash2);
    })

    it('generates expected length hash for sha-256 (64 hex characters)', async () => {
        const hash = await hashPassword('password');
        expect(hash.length).toBe(64);
    })
})
