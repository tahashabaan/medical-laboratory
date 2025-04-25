import { RequestHandler } from 'express';
declare class AWSs3Bucket {
    private s3;
    private bucketName;
    constructor();
    saveBucketFiles(folder: string, ...files: Express.Multer.File[]): Promise<void>;
    removeBucketFiles(...filePaths: string[]): Promise<void>;
    getFiles(): RequestHandler;
}
export declare const awsS3: AWSs3Bucket;
export {};
