const fs = require('fs');
const axios = require('axios');

const necessaryArg = process.argv[2];

function cat(path) {
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        // otherwise success
        console.log(data);
    });
};

async function webCat(url) {
    await axios.get(url)
        .then((result) => {
            console.log(result.data);
        }).catch((err) => {
            console.log(err.name + ': ' + err.message);
            process.exit(1);
        });
}


if (necessaryArg.startsWith('http')) webCat(necessaryArg);
else cat(necessaryArg);