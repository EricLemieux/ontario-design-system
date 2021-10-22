// Download design system archive, and extract it's contents.

const https = require('https');
const fs = require('fs');
const extract = require("extract-zip");

const designSystemVersion = '0.12.0';
const designSystemArchive = `ontario-design-system-dist-${designSystemVersion}.zip`;
const designSystemArchiveUrl = `https://designsystem.ontario.ca/dist/${designSystemArchive}`;

async function main() {
    // Check if the archive already exists, if it has already been downloaded don't download it again.
    if (fs.existsSync(designSystemArchive)) {
        console.log('Design system archive has already been downloaded, skipping downloading again.');
    } else {
        console.log(`Downloading design system archive from ${designSystemArchiveUrl}`);

        const file = fs.createWriteStream(designSystemArchive);
        const request = https.get(designSystemArchiveUrl, function (response) {
            response.pipe(file);
            file.on('finish', async function () {
                console.log('Finished downloading archive');
                file.close();

                // Extract the archive
                await extract(designSystemArchive, {dir: __dirname + '/ontario-design-system'})
            });
        });
        request.on('error', function (err) {
            console.log(err);
        });
    }
}

main().then(r => console.log('Done downloading and extracting the Ontario Design System'));
