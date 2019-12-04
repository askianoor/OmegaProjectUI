// user.ts
export interface LoginResponse {
    access_token: string;
    // name: string;
    // status: string;
    // message: string;
}

export interface UserAudits {
    id: number;
    actionName: string;
    status: string;
    actionDate: Date;
    userId: string;
}

export interface UserAuditsResponse {
    userAudits: UserAudits;
    fullAccess: boolean;
    totalItem: number;
}

export interface UserProfileResponse {
    fullName: string;
    email: string;
    userName: string;
}


