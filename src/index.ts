import express from 'express';

const port: number = 8080;
const expressInstance = express();

expressInstance.listen(port, () => {
    console.log('NoHai application started.');
});

expressInstance.get('/', (_, response: any) => {
    response.send('NoHai application.');
});