<script>
    import MaskInput from 'svelte-input-mask/MaskInput.svelte';
    import {onMount} from "svelte";

    let errors = {
        'Имя должно содержать больше 2 символов': true,
        'телефон должен быть формата +7(XXX)-XXX-XX-XX': true,
        'Пароль не может быть меньше 5 символов': true,
        'такой Логин уже есть': true,
        'Логин не может быть пустым': true,
        "не верный формат email!": true,
        'О сотруднике не может быть пустым': true
    }
    let sendBtn
    let errMsg
    let inputs
    let userRole
    onMount(async () => {
        userRole = document.getElementById('user_role')
        sendBtn = document.getElementById('send')
        errMsg = document.querySelector('.error-msg')
        inputs = document.querySelectorAll('#create-user input')
    })

    function printErrors() {
        let msg = ``
        for (const error in errors) {
            msg += `${error}</br>`
        }
        return msg
    }

    function validator(target, cond, msg) {
        if (cond) {
            sendBtn.setAttribute('disabled', 'disabled')
            errors[msg] = true
            errMsg.innerHTML = printErrors()
            target.style.border = "1px solid red"
        } else {
            delete errors[msg]
            if (Object.entries(errors).length === 0) {
                sendBtn.removeAttribute('disabled')
            }
            target.style.border = "none"
            errMsg.innerHTML = printErrors()
        }
    }

    const handleChange = ({detail}) => {
        const value = detail.inputState.maskedValue;
        sendBtn = document.querySelector('#send')
        validator(detail.element, !value.match(/^\+7\(\d+\)-\d{3}-\d{2}-\d{2}$/),
            'телефон должен быть формата +7(XXX)-XXX-XX-XX')
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

    async function loginValidate(ev) {
        const val = ev.target.value
        validator(ev.target, val.length < 2, "Логин не может быть пустым")
        let isValid = false
        try {
            const response = await sendRequest('dashboard/has-login', 'POST', {login: val})
            isValid = false
        } catch (e) {
            isValid = true
        }
        validator(ev.target, isValid, "такой Логин уже есть")
    }

    function emailValidator(ev) {
        validator(ev.target,
            !ev.target.value.match(/^[a-zA-Z0-9-.]+@[a-zA-Z]+\.[a-zA-Z]+$/),
            "не верный формат email!")
    }

    function nameValidator(ev) {
        validator(ev.target,
            ev.target.value.length < 2,
            'Имя должно содержать больше 2 символов')
    }

    function aboutValidator(ev) {
        validator(ev.target,
            ev.target.value.length < 1,
            'О сотруднике не может быть пустым')
    }

    function passwordValidator(ev) {
        validator(ev.target,
            ev.target.value.length < 5,
            'Пароль не может быть меньше 5 символов')
    }

    async function createUser() {
        let data = {}
        inputs.forEach(inp => {
            if (inp.id === "") {
                data['user_phone'] = inp.value
            } else {
                data[inp.id] = inp.value
            }
        })
        data['user_role'] = parseInt(userRole.value)
        try {
            const responsePromise = await sendRequest('dashboard/create-user', 'POST', data);
            errMsg.innerHTML = "Пользователь создан"
        } catch (e) {
            errMsg.innerHTML = e.message
        }
        inputs.forEach(inp => {
            if (inp.id !== "")
                inp.value = ""
        })
        sendBtn.setAttribute('disabled', 'disabled')
        errors = {
            'Имя должно содержать больше 2 символов': true,
            'телефон должен быть формата +7(XXX)-XXX-XX-XX': true,
            'Пароль не может быть меньше 5 символов': true,
            'такой Логин уже есть': true,
            'Логин не может быть пустым': true,
            "не верный формат email!": true,
            'О сотруднике не может быть пустым': true
        }
    }
</script>
<div class="create-user-wrapper">
    <form id="create-user">
        <label for="user_login">
            <input type="text" id="user_login" placeholder="Логин" on:change={loginValidate}>
        </label>
        <label for="user_password">
            <input type="password" id="user_password" placeholder="Пароль" on:change={passwordValidator}>
        </label>
        <label for="user_name">
            <input type="text" id="user_name" value="" placeholder="Имя сотрудника" on:change={nameValidator}>
        </label>
        <label for="user_email">
            <input type="text" id="user_email" value="" placeholder="email" on:change={emailValidator}>
        </label>
        <label for="user_phone">
                        <span id="user_phone">
                        <MaskInput
                                alwaysShowMask
                                mask="+7(000)-000-00-00"
                                size={20}
                                showMask
                                maskChar="_"
                                value=""
                                on:change={handleChange}
                        />
                    </span>
        </label>
        <label for="user_about">
            <input type="text" id="user_about" value="" placeholder="О сотруднике" on:change={aboutValidator}>
        </label>
        <select id="user_role">
            <option value="1">Обычный сотрудник</option>
            <option value="2">Администратор</option>
            <option value="3">Разработчик</option>
        </select>
        <button type="submit" id="send" disabled="disabled"
                on:click|preventDefault={createUser}
        >Создать
        </button>
        <div class="error-msg"></div>
    </form>
</div>