import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync(path.join(process.cwd(), 'custom-uploads'));
    } catch (e) {}
    cb(null, path.join(process.cwd(), 'custom-uploads'));
  },
  filename(req, file, cb) {
    const prefix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      '-' +
      file.originalname;
    cb(null, file.fieldname + '-' + prefix);
  },
});
export { storage };
