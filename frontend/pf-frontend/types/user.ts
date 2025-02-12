export interface User {
    id: string | number;
    firstname: string;
    lastname: string;
    username: string;
    userPin: string;
    email: string;
    password?: string;
    roles: UserRoles;
    status: AccountStatus;
    dateOfBirth: string;
    createdAt: string;
    updatedAt: string;
    token?: string;
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
