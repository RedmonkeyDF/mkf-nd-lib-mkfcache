import TTLCache from '@isaacs/ttlcache'
import type { TTLOptions, Options } from '@isaacs/ttlcache'
import { MkfBaseCache } from './mkfcache'

export { type TTLOptions }

export class MkfTtlCache extends MkfBaseCache {

    private _cache

    constructor( opts?: {}) {
        super()

        this._cache = new TTLCache(opts)
    }

    async get<T>(key: string, opts?: {}): Promise<T|undefined> {

        try {

            return Promise.resolve(this._cache.get(key, opts))

        } catch(e) {

            return Promise.reject(e)
        }
    }

    async set(key: string, value: any, opt?: {}): Promise<MkfBaseCache> {

        try {
            this._cache.set(key, value, opt)

            return Promise.resolve(this)

        } catch(e) {

            return Promise.reject(e)
        }
    }

    has(key: string): boolean {

        return this._cache.has(key)
    }

    async delete(key: string): Promise<boolean> {

        try {

            return Promise.resolve(this._cache.delete(key))

        } catch(e) {

            return Promise.reject(e)
        }
    }

    async size(): Promise<number> {

        try {

            return Promise.resolve(this._cache.size)

        } catch(e) {

            return Promise.reject(e)
        }
    }

    async clear(): Promise<void> {

        try {

            this._cache.clear()
            return Promise.resolve()

        } catch(e) {

            return Promise.reject(e)
        }
    }
}
