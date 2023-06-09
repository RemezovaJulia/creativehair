<script>
    import {onMount} from 'svelte';

    async function getAllUsers(url) {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Headers-change': 'change user data'
            }
        })

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }
        return response.json();
    }

    let isFetchingUsers = false; // Переменная для отслеживания состояния обновления пользователей
    let users = []; // Инициализация списка пользователей

    async function getAllUsersAndUpdate(url) {
        isFetchingUsers = true; // Устанавливаем флаг обновления пользователей
        try {
            users = await getAllUsers(url); // Обновляем список пользователей
        } catch (error) {
            console.error(error);
            // Обработка ошибки при получении пользователей
        } finally {
            isFetchingUsers = false; // Сбрасываем флаг обновления пользователей
        }
    }

    async function friedHandler(ev) {
        const id = ev.target.id.split('-')[1];
        await sendRequest('dashboard/user-fried', 'POST', {id: parseInt(id)});
        await getAllUsersAndUpdate('dashboard/get-all-users'); // После успешного выполнения запроса, обновляем список пользователей
    }

    async function revertHandler(ev) {
        const id = ev.target.id.split('-')[1];
        await sendRequest('dashboard/user-revert', 'POST', {id: parseInt(id)});
        await getAllUsersAndUpdate('dashboard/get-all-users'); // После успешного выполнения запроса, обновляем список пользователей
    }

    onMount(() => {
        // При инициализации компонента, получаем список пользователей
        getAllUsersAndUpdate('dashboard/get-all-users');
    });

    const roles = {
        1: "Обычный пользователь",
        2: "Администратор",
        3: "Разработчик"
    };

    async function sendRequest(url, CRUDMethod, data) {
        const response = await fetch(url, {
            method: CRUDMethod,
            headers: {
                'Content-Type': 'application/json',
                'X-Headers-change': 'change user data'
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }
        return response.json();
    }

    function isFried(user) {
        return user['Active'] ? '' : 'user-fried'
    }

</script>

{#if isFetchingUsers}
    <p>Loading...</p>
{:else}
    <div class="users-wrapper">
        {#if users.length !== 0}
            {#each users['employees'] as user}
                <div class="user-card {isFried(user)}">
                    <p>Имя: {user.Name}</p>
                    <p>Телефон: {user.Phone}</p>
                    <p>Email: {user.Email}</p>
                    <p>Роль: {roles[user.RoleId]}</p>
                    <div class="btns">
                        {#if user['Active']}
                            <a href={'#'} id="fired-{user.Id}" on:click|preventDefault={friedHandler}>Уволить</a>
                        {:else }
                            <a href={"#"} id="revert-{user.Id}" on:click|preventDefault={revertHandler}>Вернуть</a>
                        {/if}
                    </div>
                </div>
            {/each}
        {/if}
    </div>
{/if}