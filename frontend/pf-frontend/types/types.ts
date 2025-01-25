export interface RegistrationResponse {
    id: number;
    email: string;
    username?: string;
    status?: string;
}

export interface AuthenticationResponse {
    token: string;
}
