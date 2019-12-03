// user.ts
export interface LoginResponse {
    access_token: string;
    // name: string;
    // status: string;
    // message: string;
}

export interface UserAuditsResponse {
    id: number;
    actionName: string;
    status: string;
    actionDate: Date;
    userId: string;
}

export interface UserProfileResponse {
    fullName: string;
    email: string;
    userName: string;
}


