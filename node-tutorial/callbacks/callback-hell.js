const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err) {
        console.error('Error reading file:', err);
        return;
    }

    const modifyFileData = data.toUpperCase();

    fs.writeFile('output.txt', modifyFileData, (err) => {
        if(err) {
            console.error('Error writing to file:', err);
            return;
        }

        console.log('File modified and saved successfully.');
    })
})