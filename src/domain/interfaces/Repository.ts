export interface Repository<T> {
    create(item: T): Promise<T>;
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    update(item: T): Promise<T>;
    delete(id: string): Promise<void>;
}
