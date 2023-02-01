import { routes } from './routers.js';
import express from 'express';

const smartbrain = express();

smartbrain.use('/smartbrain.com/users', routes);

//in case a wrong url is entered
smartbrain.all('*', (req, res) => {
    res.send('Page not found. Please check URL for typo...')
})
//end
smartbrain.listen(4000, ['smartbrain.com'], () => {
    console.log('[smartbrain] listening to new incoming connections at port 4000');
});