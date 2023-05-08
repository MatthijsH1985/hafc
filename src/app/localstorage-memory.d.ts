declare module 'localstorage-memory' {
  export interface LocalStorage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    clear(): void;
    length: number;
    key(index: number): string | null;
  }

  export const localStorage: LocalStorage;

}
