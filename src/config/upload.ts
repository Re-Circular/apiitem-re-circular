import crypto from 'node:crypto';
import multer from 'multer';
import { resolve } from 'node:path';




const uploadConfig = (folder: string) =>
  multer({
    storage: multer.diskStorage({
      destination: resolve(__dirname, "..", "..", folder),
      filename: (req, file, callback) => {
        const fileHash = crypto.randomBytes(16).toString("hex");
        const filename = `${fileHash}-${file.originalname}`;
        callback(null, filename);
      },
    }),
  });

export default uploadConfig;
