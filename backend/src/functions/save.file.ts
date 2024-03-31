import {FileInterface} from "../hotel/hotel.interfaces";
import {writeFile} from "fs";
import {join} from "path";
import * as fs from "fs";
import {rethrow} from "@nestjs/core/helpers/rethrow";

export function saveFile(prefix: string, file: FileInterface): string {
    const extension = file.originalname.split('.')[1];
    const fileFolder = `/public/images/${prefix}s`;
    const imagePath = `${fileFolder}/${prefix}-${Date.now()}${Math.random()}.${extension}`;
    fs.mkdir(join(__dirname, '..', '..', fileFolder), { recursive: true }, (e) => {
        console.log(e);
    });
    writeFile(join(__dirname, '..', '..', imagePath), file.buffer, function (err) {
        if (err) {
            console.log(err);
        }
    });

    return imagePath;
}