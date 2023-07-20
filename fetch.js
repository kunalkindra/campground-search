const https = require('https');

function fetch(url) {
    return  new Promise((resolve, reject) => {
        https.get(url, (resp) => {
            let data = '';

            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve(JSON.parse(data));
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
            reject(err)
        });
    });

}

module.exports = fetch;