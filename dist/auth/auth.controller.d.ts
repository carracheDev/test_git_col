export declare class AuthController {
    login(body: {
        email: string;
        password: string;
    }): {
        success: boolean;
        token: string;
        user: {
            id: string;
            email: string;
            name: string;
        };
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        token?: undefined;
        user?: undefined;
    };
}
