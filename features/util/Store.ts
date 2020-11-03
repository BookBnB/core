export default class Store {
    private static INSTANCE: Store;

    public static getInstance(): Store {
        if (!this.INSTANCE) {
            this.INSTANCE = new Store();
        }
        return this.INSTANCE;
    }

    public static reset(): void {
        this.INSTANCE = new Store();
    }

    private map: Map<string, any>;

    private constructor() {
        this.map = new Map<string, any>();
    }

    public set<T>(key: string, value: T) {
        this.map.set(key, value);
    }

    public get<T>(key: string): T {
        return <T>this.map.get(key);
    }

    public has(key: string): boolean {
        return this.map.has(key);
    }
}