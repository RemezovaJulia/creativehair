import '../../css/appointments.scss';
import App from '../sveltejs/appointments.svelte';
const appointments = new App({
    target:  document.getElementById('appointments'),
});
export {appointments};