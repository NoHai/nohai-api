import express from 'express';
import {container} from './presentation/ioc/container';

const port: number = 8080;
const expressInstance = express();

expressInstance.listen(port, () => {
    container.configure().subscribe();
    console.log('NoHai application started.');
});

expressInstance.get('/', (_, response: any) => {
    response.send('NoHai application.');
});
