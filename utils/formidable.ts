import formidable from "formidable";
import IncomingForm from "formidable/Formidable";
import fs from "fs";
import express from "express";

const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });

export const form = formidable({
  uploadDir,
  keepExtensions: false,
  maxFiles: 3,
  multiples : true,
  filename: (_originalName, _originalExt, part) => {
    const fieldName = part.name;
    const timestamp = Date.now();
    const ext = part.mimetype?.split("/").pop();
    return `${fieldName}-${timestamp}.${ext}`;
  },
});

export function formParsePromise(form: IncomingForm, req: express.Request) {
    return new Promise<{ fields: formidable.Fields; files: formidable.Files }>(
        (resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                else resolve({ fields, files });
            });
        }
    );
}
