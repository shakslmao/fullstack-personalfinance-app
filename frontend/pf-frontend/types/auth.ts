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
