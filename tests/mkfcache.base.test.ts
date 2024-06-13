import { describe, expect, test } from 'vitest'
import { MkfBaseCache } from '../src'
import { MkfTtlCache } from '../src'

const sleep = (ms: number):Promise<void> => {

    return new Promise((resolve, reject) => {

        try {

            setTimeout(() => {

                resolve()
            }, ms)
        }catch(e) {

            reject(e)
        }
    })
}

type constructfunc = () => MkfBaseCache
describe('MkfBaseCache tests', () => {

    const constructors: { init: constructfunc, name: string }[] = [
        { init: () => new MkfTtlCache({ max: 100, ttl: 10000 }), name: 'MkfTtlCache' }
    ]

    test.each(constructors)('It gets / sets / has a value', async (ob) => {

        const cache: MkfBaseCache = ob.init()

        expect(cache.has('idontexist')).toStrictEqual(false)
        await expect(cache.set('tester', 'isset')).resolves.toStrictEqual(cache)
        expect(cache.has('tester')).toStrictEqual(true)
        await expect(cache.get('tester')).resolves.toStrictEqual('isset')
    })

    test.each(constructors)('It returns typed values', async (ob) => {

        const cache: MkfBaseCache = ob.init()

        type Testtype = {

            testnum: number,
            teststr: string
        }

        const testob = {testnum: 69, teststr: 'tester'}

        await cache.set('testkey', testob)

        await expect(cache.get<Testtype>('testkey')).resolves.toEqual(testob)

        const to: Testtype|undefined = await cache.get<Testtype>('testkey')

        expect(to).not.toBeUndefined

        if (to) {

            expect(to.testnum).toEqual(69)
            expect(to.teststr).toEqual('tester')
        }
    })

    test.each(constructors)('It should expire correctly', async () => {

        const cache: MkfBaseCache = new MkfTtlCache({ max: 100, ttl: 1000 })

        await cache.set('temp', 'over9000')
        expect(cache.has('temp')).toStrictEqual(true)
        await sleep(2000)
        expect(cache.has('temp')).toStrictEqual(false)
    })
})