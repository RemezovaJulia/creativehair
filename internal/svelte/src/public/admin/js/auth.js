import '../../css/fonts.scss';
import '../../css/auth.scss';


import App from '../sveltejs/auth.svelte';

const app = new App({
    target: document.getElementById('app'), // entry point in ../public/index.html
});

export {app};

