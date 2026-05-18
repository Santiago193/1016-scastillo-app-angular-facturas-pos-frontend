export interface User {
    id: number;
    username: string;
    role: 'ADMIN' | 'EMPLEADO'; // Los dos roles que pediste
    token: string;              // Aquí guardaremos el Bearer Token
}
export interface UserResponse {
    id: number;
    username: string;
    role: string;
}