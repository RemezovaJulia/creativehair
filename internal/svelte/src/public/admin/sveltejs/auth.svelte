<script>
    async function sendHandler(ev) {
        ev.preventDefault()
        const data = Object.fromEntries(
            new FormData(document.getElementById('auth_form')).entries()
        );
        try {
           const response = await sendRequest(data);
            localStorage.setItem('user', JSON.stringify(response))
            location.href = "/dashboard"
        } catch (e) {
            printError(e)
        }
    }

    function printError(error) {
        const errorData = JSON.parse(error.message) || {};
        if (errorData['error'] !== undefined) {
            document.getElementById("error-form-msg").textContent = errorData.error;
        }

        const inputs = document.querySelectorAll('input')
        inputs.forEach(input => {
            if (input.type !== 'submit') {
                input.value = '';
            }
        });

    }

    async function sendRequest(data) {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        return response.json();
    }
</script>
<div id="form_wrapper">
    <form id="auth_form">
        <label for="login">
            <input type="text" name="login" id="login" placeholder="Логин" value="">
        </label>
        <label for="password">
            <input type="password" name="password" id="password" placeholder="Пароль" value="">
        </label>
        <input type="submit" id="send" value="Войти" on:click|preventDefault={sendHandler}>
        <div id="error-form-msg"></div>
    </form>
</div>
