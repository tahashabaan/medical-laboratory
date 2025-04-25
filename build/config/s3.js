"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.awsS3 = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const env_1 = require("./env");
const winston_1 = require("./winston");
const notfound_error_1 = require("../errors/notfound-error");
class AWSs3Bucket {
    constructor() {
        this.s3 = new aws_sdk_1.default.S3({
            accessKeyId: env_1.env.aws.accessKey,
            secretAccessKey: env_1.env.aws.secretKey,
            region: env_1.env.aws.region,
        });
        this.bucketName = env_1.env.aws.bucket;
    }
    saveBucketFiles(folder, ...files) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const file of files) {
                try {
                    yield this.s3
                        .upload({
                        Bucket: this.bucketName,
                        Key: `${folder}/${file.filename}`,
                        Body: file.buffer,
                    })
                        .promise();
                }
                catch (error) {
                    winston_1.logger.error(error);
                }
            }
        });
    }
    removeBucketFiles(...filePaths) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise((resolve, reject) => {
                this.s3.deleteObjects({
                    Bucket: this.bucketName,
                    Delete: {
                        Objects: filePaths.map((el) => ({ Key: el.split(env_1.env.aws.bucketUrl).at(-1) || '' })),
                    },
                }, (err, data) => {
                    if (err) {
                        winston_1.logger.error(err);
                        reject(err);
                    }
                    else
                        resolve(data);
                });
            });
        });
    }
    getFiles() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const filePath = req.query.filePath;
            const params = {
                Bucket: this.bucketName,
                Key: filePath,
            };
            res.setHeader('Content-Disposition', `inline; filename="${filePath}"`);
            this.s3
                .getObject(params)
                .createReadStream()
                .on('error', (err) => {
                winston_1.logger.error(err);
                return next(new notfound_error_1.NotFound());
            })
                .on('end', () => {
                res.end();
            })
                .pipe(res);
        });
    }
}
exports.awsS3 = new AWSs3Bucket();
