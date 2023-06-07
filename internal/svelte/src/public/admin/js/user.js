import '../../css/user.scss';
import App from '../sveltejs/user.svelte';
const gallery = new App({
    target: document.getElementById('gallery'), // entry point in ../public/index.html
});
export {gallery};