import multer from 'multer';
export interface uploadOptions {
    fileType?: string[];
    maxSize?: number;
    fileFilter?(req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback): void;
}
export declare const uploadMemoryStorage: (options?: uploadOptions) => multer.Multer;
