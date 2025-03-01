const mime = require('mime-types');

function getMimeType(ext) {
    return new Promise((resolve, reject) => {
        const mimeType = mime.lookup(ext);
        if (!mimeType) {
            reject("Unknown MIME type");
        } else {
            resolve(mimeType);
        }
    });
}

module.exports = getMimeType;
