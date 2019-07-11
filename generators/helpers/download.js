const https = require('https');
const fs = require('fs');

const download = (url, location) => new Promise((resolve, reject) => {
  const file = fs.createWriteStream(location);

  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close(resolve());
    });
  })
    .on('error', (error) => {
      fs.unlink(location);
      reject(error);
    })
});

module.exports = download;
