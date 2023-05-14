import { public_cat_service } from "../../services/public/public_cat_service";
import { Request, Response } from "express";
import { form } from "../../utils/formidable";
import axios from "axios";

export class public_cat_controller {
    constructor(private public_cat_service: public_cat_service) {}

    public_cat = async (_req: Request, res: Response) => {
        try {
            const public_cat = await this.public_cat_service.cat();
            console.log(public_cat);

            res.status(200).json(public_cat);
        } catch (err) {
            res.status(500).json({ message: "something wrong with the cats" });
        }
    };

    public_cat_info = async (req: Request, res: Response) => {
        try {
            const catId = +req.params.id;
            const public_cat = await this.public_cat_service.cat_info(catId);
            console.log(public_cat);

            res.status(200).json(public_cat);
        } catch (err) {
            res.status(500).json({ message: "something wrong with the cats" });
        }
    };

    //connect to python server
    public_cat_verifying = async (req: Request, res: Response) => {
        try {
            form.parse(req, async (err, fields, files) => {
                if (files.image) {
                    const cat_img = Array.isArray(files.image) ? files.image : [files.image];
                    const imageFile = cat_img[0].newFilename;
                    console.log(imageFile);

                    // create a new FormData object

                    // send a POST request to the Sanic server
                    const response = await axios(`http://127.0.0.1:8000/predict?name=${imageFile}`);

                    const predictedClass = response.data.result;
                    console.log(predictedClass);
                    res.json(predictedClass);
                }
            });
        } catch (err) {
            res.status(500).json({ message: "Can't assess Python or null of value" });
        }
    };
}

// const ogj =[image:{PersistentFile {

//     _eventsCount: 1,
//     _maxListeners: undefined,
//     lastModifiedDate: 2023-05-12T06:27:44.164Z,
//     filepath: '/Users/takfungwong/Desktop/Tecky Course/BAD-course/BAD-Project-3/uploads/image-1683872864156.jpeg',
//     newFilename: 'image-1683872864156.jpeg',
//     originalFilename: 'maine-coon-cat-breed-768x658.jpg',
//     mimetype: 'image/jpeg',
//     hashAlgorithm: false,
//     size: 234274,
//     _writeStream: WriteStream {
//       fd: 26,
//       path: '/Users/takfungwong/Desktop/Tecky Course/BAD-course/BAD-Project-3/uploads/image-1683872864156.jpeg',
//       flags: 'w',
//       mode: 438,
//       start: undefined,
//       pos: undefined,
//       bytesWritten: 234274,
//       _writableState: WritableState {
//         objectMode: false,
//         highWaterMark: 16384,
//         finalCalled: false,
//         needDrain: true,
//         ending: true,
//         ended: true,
//         finished: true,
//         destroyed: false,
//         decodeStrings: true,
//         defaultEncoding: 'utf8',
//         length: 0,
//         writing: false,
//         corked: 0,
//         sync: false,
//         bufferProcessing: false,
//         onwrite: [Function: bound onwrite],
//         writecb: null,
//         writelen: 0,
//         afterWriteTickInfo: null,
//         buffered: [],
//         bufferedIndex: 0,
//         allBuffers: true,
//         allNoop: true,
//         pendingcb: 0,
//         constructed: true,
//         prefinished: true,
//         errorEmitted: false,
//         emitClose: true,
//         autoDestroy: true,
//         errored: null,
//         closed: false,
//         closeEmitted: false,
//         [Symbol(kOnFinished)]: []
//       },
//       _events: [Object: null prototype] { error: [Function (anonymous)] },
//       _eventsCount: 1,
//       _maxListeners: undefined,
//       [Symbol(kFs)]: {
//         appendFile: [Function: appendFile],
//         appendFileSync: [Function: appendFileSync],
//         access: [Function: access],
//         accessSync: [Function: accessSync],
//         chown: [Function: chown],
//         chownSync: [Function: chownSync],
//         chmod: [Function: chmod],
//         chmodSync: [Function: chmodSync],
//         close: [Function: close],
//         closeSync: [Function: closeSync],
//         copyFile: [Function: copyFile],
//         copyFileSync: [Function: copyFileSync],
//         cp: [Function: cp],
//         cpSync: [Function: cpSync],
//         createReadStream: [Function: createReadStream],
//         createWriteStream: [Function: createWriteStream],
//         exists: [Function: exists],
//         existsSync: [Function: existsSync],
//         fchown: [Function: fchown],
//         fchownSync: [Function: fchownSync],
//         fchmod: [Function: fchmod],
//         fchmodSync: [Function: fchmodSync],
//         fdatasync: [Function: fdatasync],
//         fdatasyncSync: [Function: fdatasyncSync],
//         fstat: [Function: fstat],
//         fstatSync: [Function: fstatSync],
//         fsync: [Function: fsync],
//         fsyncSync: [Function: fsyncSync],
//         ftruncate: [Function: ftruncate],
//         ftruncateSync: [Function: ftruncateSync],
//         futimes: [Function: futimes],
//         futimesSync: [Function: futimesSync],
//         lchown: [Function: lchown],
//         lchownSync: [Function: lchownSync],
//         lchmod: [Function: lchmod],
//         lchmodSync: [Function: lchmodSync],
//         link: [Function: link],
//         linkSync: [Function: linkSync],
//         lstat: [Function: lstat],
//         lstatSync: [Function: lstatSync],
//         lutimes: [Function: lutimes],
//         lutimesSync: [Function: lutimesSync],
//         mkdir: [Function: mkdir],
//         mkdirSync: [Function: mkdirSync],
//         mkdtemp: [Function: mkdtemp],
//         mkdtempSync: [Function: mkdtempSync],
//         open: [Function: open],
//         openSync: [Function: openSync],
//         opendir: [Function: opendir],
//         opendirSync: [Function: opendirSync],
//         readdir: [Function: readdir],
//         readdirSync: [Function: readdirSync],
//         read: [Function: read],
//         readSync: [Function: readSync],
//         readv: [Function: readv],
//         readvSync: [Function: readvSync],
//         readFile: [Function: readFile],
//         readFileSync: [Function: readFileSync],
//         readlink: [Function: readlink],
//         readlinkSync: [Function: readlinkSync],
//         realpath: [Function],
//         realpathSync: [Function],
//         rename: [Function: rename],
//         renameSync: [Function: renameSync],
//         rm: [Function: rm],
//         rmSync: [Function: rmSync],
//         rmdir: [Function: rmdir],
//         rmdirSync: [Function: rmdirSync],
//         stat: [Function: stat],
//         statSync: [Function: statSync],
//         symlink: [Function: symlink],
//         symlinkSync: [Function: symlinkSync],
//         truncate: [Function: truncate],
//         truncateSync: [Function: truncateSync],
//         unwatchFile: [Function: unwatchFile],
//         unlink: [Function: unlink],
//         unlinkSync: [Function: unlinkSync],
//         utimes: [Function: utimes],
//         utimesSync: [Function: utimesSync],
//         watch: [Function: watch],
//         watchFile: [Function: watchFile],
//         writeFile: [Function: writeFile],
//         writeFileSync: [Function: writeFileSync],
//         write: [Function: write],
//         writeSync: [Function: writeSync],
//         writev: [Function: writev],
//         writevSync: [Function: writevSync],
//         Dir: [class Dir],
//         Dirent: [class Dirent],
//         Stats: [Function: Stats],
//         ReadStream: [Getter/Setter],
//         WriteStream: [Getter/Setter],
//         FileReadStream: [Getter/Setter],
//         FileWriteStream: [Getter/Setter],
//         _toUnixTimestamp: [Function: toUnixTimestamp],
//         F_OK: 0,
//         R_OK: 4,
//         W_OK: 2,
//         X_OK: 1,
//         constants: [Object: null prototype],
//         promises: [Getter]
//       },
//       [Symbol(kIsPerformingIO)]: false,
//       [Symbol(kCapture)]: false
//     },
//     hash: null,
//     [Symbol(kCapture)]: false
//   }}]
