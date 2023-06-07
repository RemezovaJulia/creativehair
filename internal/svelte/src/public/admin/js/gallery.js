import '../../css/appointments.scss';
import App from '../sveltejs/gallery.svelte';
const gallery = new App({
    target: document.getElementById('gallery'), // entry point in ../public/index.html
});
export {gallery};