require("babel-polyfill");

import Router from './libs/Router';
import Root from './views/root';

const router = new Router();

const root = router.decorate(Root, []);
root.setDomElement('body');
router.setRoute('/game');
