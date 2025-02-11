export interface RegistrationResponse {
    id: number;
    email: string;
    username?: string;
    status?: string;
}

export interface AuthenticationResponse {
    userId: number;
    token: string;
    error?: string;
}

export interface AuthenticationRequest {
    email: string;
    password: string;
}

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    roles: UserRoles;
    status: AccountStatus;
    dateOfBirth: string;
    createdAt: string;
    updatedAt: string;
}

export enum UserRoles {
    USER = "USER",
    ADMIN = "ADMIN",
}

export enum AccountStatus {
    ACTIVE_NON_AUTH = "ACTIVE_NON_AUTH",
    ACTIVE_AUTHENTICATED = "ACTIVE_AUTHENTICATED",
    LOCKED = "LOCKED",
}
