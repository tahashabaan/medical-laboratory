export declare const Bcrypt: {
    hashPwd: (pwd: string, salt: string | number, paper?: string) => Promise<string>;
    comparePwd: (pwd: string, hashed: string, paper?: string) => Promise<boolean>;
};
