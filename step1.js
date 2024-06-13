const fs = require('fs');

const filepath = process.argv[2];

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

cat(filepath);