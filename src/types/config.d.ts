declare module 'config' {
    export function get<T>(setting: string): T;
    export function has(setting: string): boolean;
} 