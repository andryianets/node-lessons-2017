const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const Transform = require('stream').Transform;

class UppercaseStream extends Transform {
    _transform(chunk, encoding, cb) {
        this.push(chunk.toString().toUpperCase());
        cb();
    }
}

const compress = zlib.createGzip();

const fileReadStream = fs.createReadStream(path.resolve(__dirname, 'data.txt'));
const outputStream = fs.createWriteStream(path.resolve(__dirname, 'data.gz'));
const uppercaseStream = new UppercaseStream();

fileReadStream
    .pipe(uppercaseStream)
    .pipe(compress)
    .pipe(outputStream);