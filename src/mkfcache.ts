export abstract class MkfBaseCache {

    abstract set(key: string, value: any, opt?: {}): Promise<MkfBaseCache>;
    abstract get<T>(key: string, opts?: {}): Promise<T|undefined>;
    abstract has(key: string): boolean;
    abstract delete(key: string):Promise<boolean>
}
