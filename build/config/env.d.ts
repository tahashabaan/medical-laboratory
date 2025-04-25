export declare const env: {
    port: number;
    environment: string;
    frontUrl: string[];
    apiUrl: string;
    auth: {
        activationCodeExpireIn: number;
        resetPasswordCodeExpireIn: number;
    };
    bcrypt: {
        salt: number;
        paper: string | undefined;
    };
    jwt: {
        secret: string;
        accessExpireIn: number;
        refreshExpireIn: number;
    };
    mail: {
        host: string | undefined;
        service: string | undefined;
        port: number;
        driver: string;
        user: string;
        pass: string;
    };
    redis: {
        url: string;
    };
    firebase: {
        apiKey: string | undefined;
        authDomain: string | undefined;
        projectId: string | undefined;
        storageBucket: string | undefined;
        messagingSenderId: string | undefined;
        appId: string | undefined;
        measurementId: string | undefined;
        clientEmail: string | undefined;
        privateKey: string | undefined;
    };
    postgres: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    };
    aws: {
        accessKey: string;
        secretKey: string;
        region: string;
        bucket: string;
        bucketUrl: string;
    };
    warehouseRequestExpiresIn: number;
};
export declare const checkEnvVariables: () => void;
