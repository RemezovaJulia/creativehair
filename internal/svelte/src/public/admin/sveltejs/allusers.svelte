<script>
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

    const roles = {
        1: "Обычный пользователь",
        2: "Администратор",
        3: "Разработчик"
    }
    async function friedHandler(ev) {
        const id = ev.target.id.split('-')[1]
        await sendRequest('dashboard/user-fried', 'POST', {id: parseInt(id)})
    }
    async function revertHandler(ev) {
        const id = ev.target.id.split('-')[1]
        await sendRequest('dashboard/user-revert', 'POST', {id: parseInt(id)})
    }
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
</script>

{#await getAllUsers('dashboard/get-all-users')}
    ...
{:then users}
    <div class="users-wrapper">
        {#each users['employees'] as user}
            <div class="user-card">
                <p>Имя: {user.Name}</p>
                <p>Телефон: {user.Phone}</p>
                <p>Email: {user.Email}</p>
                <p>Роль: {roles[user.RoleId]}</p>
                <div class="btns">
                    <a href="{'#'}" id="fired-{user.Id}" on:click|preventDefault={friedHandler}>Уволить</a>
                    <a href="{'#'}" id="revert-{user.Id}" on:click|preventDefault={revertHandler}>Вернуть</a>
                </div>
            </div>
        {/each}
    </div>
{/await}