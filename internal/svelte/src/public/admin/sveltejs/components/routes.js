import ChangeUserdata from "../changeuserdata.svelte";
import UserGallery from "../usergallery.svelte";
import Schedule from "../schedule.svelte";
import OpenBid from "../openbid.svelte";
import CloseBid from "../closebid.svelte";
import AllUsers from "../allusers.svelte";
import CreateUser from "../createuser.svelte";

const userRole = JSON.parse(localStorage.getItem("user"))['role'];

export let items = [
    {
        name: 'Сотрудник',
        icon: 'icon-user',
        subItems: [
            {name: 'Личные данные', link: '/userdata', component: ChangeUserdata},
            {
                name: 'Записи', icon: '', subItems: [
                    {name: 'Открытые записи', link: '/openbid', component: OpenBid},
                    {name: 'Закрытые записи', link: '/closebid', component: CloseBid},
                ]
            },
            {name: 'Галерея', link: '/userGallery', component: UserGallery},
        ]
    },
];

function generateRoutes(items, routes = {}) {
    items.forEach(item => {
        if (item.link) {
            routes[item.link] = item.component;
        }
        if (item.subItems) {
            generateRoutes(item.subItems, routes);
        }
    });
    return routes;
}


if (userRole > 1) {
    const users = {
        name: 'Сотрудники',
        icon: 'icon-users',
        subItems: [
            {name: 'Создать сотрудника', link: '/createUser', component: CreateUser},
            {name: 'Все сотрудники', link: '/allUsers', component: AllUsers},
        ]
    }
    const schedule = {name: 'График работы', link: '/schedule', component: Schedule};
    items.push(users,schedule);
}
export const routes = generateRoutes(items);