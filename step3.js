const fs = require('fs');
const axios = require('axios');

const args = process.argv.slice(2);

let outFile = null;
let necessaryArg = null;

// Check if the --out flag is present
if (args[0] === '--out') {
    outFile = args[1];
    necessaryArg = args[2];
} else necessaryArg = args[0];

function printToFile(filepath, text) {
    fs.writeFile(filepath, text, "utf8", function (err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
}

function cat(path) {
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        handleOutput(data);
    });
}

async function webCat(url) {
    await axios.get(url)
        .then((result) => {
            handleOutput(result.data);
        }).catch((err) => {
            console.log(err.name + ': ' + err.message);
            process.exit(1);
        });
}

function handleOutput(content) {
    if (outFile) printToFile(outFile, content);
    else console.log(content);
}

if (necessaryArg.startsWith('http')) webCat(necessaryArg);
else cat(necessaryArg);