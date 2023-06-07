import '../../css/dashboard.scss';

import App from '../sveltejs/dashboard.svelte';
const dashboard = new App({
    target: document.getElementById('dashboard'), // entry point in ../public/index.html
});


// function importAll(r) {
//     let images = {};
//     r.keys().forEach((key) => {
//         const path = key.substring(2); // Убираем начальный './'
//         const parts = path.split('/');
//         let currentObj = images;
//         for (let i = 0; i < parts.length - 1; i++) {
//             const part = parts[i];
//             if (!currentObj[part]) {
//                 currentObj[part] = {};
//             }
//             currentObj = currentObj[part];
//         }
//         if (parts.length > 1 && parts[parts.length - 2] === 'users') {
//             const userId = parts[parts.length - 2];
//             const photoName = parts[parts.length - 1];
//             if (!currentObj[userId]) {
//                 currentObj[userId] = {};
//             }
//             currentObj[userId][photoName] = r(key).default;
//         } else {
//             currentObj[parts[parts.length - 1]] = r(key).default;
//         }
//     });
//     return images;
// }
//
// const images = importAll(require.context('../../images', true, /\.(png|jpe?g|svg)$/));
//
export {dashboard};