<script>
    import {onMount} from 'svelte';
    import Cropper from 'svelte-easy-crop';
    import MaskInput from 'svelte-input-mask/MaskInput.svelte';

    let sendBtn
    let errMsg;
    let user = JSON.parse(localStorage.getItem('user'))
    let oldPass;
    let formInputs;
    let avatar;
    let avatarChangeAccept;
    let zoom = 2
    let cropSize = {width: 150, height: 150}
    let userPhoto;
    let about;
    onMount(() => {
        errMsg = document.querySelector('#error-form-msg');
        sendBtn = document.querySelector('#send');
        oldPass = document.getElementById('old_pass')
        about = document.getElementById('about')
        formInputs = document.querySelectorAll('#change-user-data input')
        avatar = document.getElementById('avatar-upload')
        avatarChangeAccept = document.getElementById('accept')
        userPhoto = document.getElementById('user-photo')
    });


    const errors = {};

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

    function emailValidator(ev) {
        validator(ev.target, !ev.target.value.match(/^[a-zA-Z0-9-.]+@[a-zA-Z]+\.[a-zA-Z]+$/),
            "не верный формат email!")
    }

    function newPassValidator(ev) {
        const eTarget = ev.target
        const isSmallNewPass = eTarget.value.length < 5 && eTarget.value !== "";
        (async () => {
            await oldPassValidator(oldPass)
            validator(eTarget, isSmallNewPass, "Пароль не может быть меньше 5 символов")
        })()
    }

    async function oldPassValidator(target) {
        target = target instanceof Event ? target.target : target
        const isValid = async () => {
            try {
                await sendRequest(
                    'dashboard/compare-old-password',
                    'POST',
                    {'old_password': target.value}
                );
                return false
            } catch (e) {
                return true
            }
        }
        const cond = await isValid()
        validator(target, cond, "Старый пароль введен неверно!")
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
        return response;
    }

    function handleFileInput(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        let error = false
        reader.onload = () => {
            user.photo = reader.result;
        };

        reader.onerror = () => {
            error = true
        };

        if (file) {
            reader.readAsDataURL(file);
        }
        validator(event.target, error, "Файл не подходит!")
    }

    function changeAvatarOnKey(ev) {
        if (ev.code === 'Space' || ev.key === ' ') {
            avatar.click(ev);
        }
    }

    let changePhoto = false

    function changeAvatar() {
        avatar.click();
        changePhoto = true
        document.querySelector('body').style.overflow = 'hidden'
    }

    async function send() {
        let data = {}
        formInputs.forEach((item) => {
            const value = item.value.trim()
            const id = item.id

            if (id === "") {
                data['phone'] = value
            } else {
                if (value !== "") {
                    data[id] = value
                }
            }
        })
        try {
            const response = await sendRequest('dashboard/change-user-data', 'PUT', data)
            const json = await response.json()
            user.email = json.email
            user.name = json.name
            user.phone = json.phone
            user.about = json.about
            localStorage.setItem('user', JSON.stringify(user))
            errMsg.innerHTML = "<span style='color: #0dfca2;'>данные изменены!</span>"
        } catch (e) {
            errMsg.innerHTML = "Не удалось отправить форму!"
        }
    }

    let image;
    $: {
        image = user.photo;
    }
    let cropData = null;

    function handleCrop(data) {
        cropData = data;
    }

    async function avatarChangeAcceptHandler(ev) {
        if (cropData) {
            const crop = cropData.detail.pixels;
            changePhoto = false
            document.querySelector('body').removeAttribute('style');
            const input = document.getElementById('avatar-upload');
            const file = input.files[0];

            const formData = new FormData();
            formData.append('image', file);
            formData.append('data', JSON.stringify(crop))
            try {
                const response = await fetch('dashboard/upload-avatar', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    let photo = await response.json()
                    user.photo = photo.photo
                    localStorage.setItem('user', JSON.stringify(user))
                } else {
                    console.log('Произошла ошибка при загрузке изображения на сервер');
                }
            } catch (error) {
                console.log('Произошла ошибка:', error);
            }
        }
    }


    function closeCopper() {
        changePhoto = false
        document.querySelector('body').removeAttribute('style');
    }

    const handleChange = ({detail}) => {
        const value = detail.inputState.maskedValue;

        validator(detail.element, !value.match(/^\+7\(\d+\)-\d{3}-\d{2}-\d{2}$/),
            'телефон должен быть формата +7(XXX)-XXX-XX-XX')
    };
    const aboutValidator = ev => {
      const eTarget = ev.target
      const isSmall = eTarget.value === ""
      validator(eTarget, isSmall, "О себе должно быть заполнено")
    }
</script>

<div class="container">
  <h1>Изменить свои данные:</h1>
  <form id="change-user-data" method="post">
    <input type="file" accept="image/*" id="avatar-upload" style="display: none;" on:change={handleFileInput}/>
    {#if changePhoto}
      <div class="cropper-overflow">
        <a href="{'#'}" id="close-cropper" on:click|preventDefault={closeCopper}>×</a>
        <div class="cropper-wrapper">
          <Cropper aspect={1} {image}
                   bind:cropSize
                   bind:zoom
                   on:cropcomplete={handleCrop}
          />
        </div>
        <div class="photo-change">
          <button class="photo-change-control" id="accept" on:click|preventDefault={avatarChangeAcceptHandler}>
            применить
          </button>
        </div>
      </div>
    {/if}
    <div id="avatar-frame">
      <img src="{user?.photo|| ''}" alt="" tabindex="-1" width="150" id="user-photo"
           on:click={changeAvatar}
           on:keydown={changeAvatarOnKey}>
    </div>

    <label for="name">
      <input type="text" id="name" placeholder="Имя" value="{user?.name || ''}">
    </label>
    <label for="email">
      <input type="email" id="email" placeholder="email" value="{user?.email || ''}" on:change={emailValidator}>
    </label>
    <label for="phone">
        <span id="phone">
             <MaskInput
                 alwaysShowMask
                 mask="+7(000)-000-00-00"
                 size={20}
                 showMask
                 maskChar="_"
                 on:change={handleChange}
                 value="{user?.phone||''}"
             />
        </span>
    </label>
    <label for="old_pass">
      <input type="password" id="old_pass" placeholder="Старый пароль" value="" on:change={oldPassValidator}>
    </label>
    <label for="new_pass">
      <input type="password" id="new_pass" placeholder="Новый пароль" value="" on:change={newPassValidator}>
    </label>
    <label for="about">
      <input type="text" id="about" placeholder="Информация о себе" value="{user?.about?.String||''}" on:change={aboutValidator}>
    </label>
    <button id="send" disabled="disabled" on:click|preventDefault={send}>Изменить</button>
    <div id="error-form-msg">

    </div>
  </form>
</div>

<style>
    .cropper-overflow {
        position: absolute;
        z-index: 9999999;
        width: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.96);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
    }

    .cropper-wrapper {
        position: relative;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .photo-change {
        margin: 15px 0;
    }

    #avatar-frame {
        overflow: hidden;
        width: 150px;
        height: 150px;
    }

    #accept {
        cursor: pointer;
        padding: 3px 10px;
        background-color: aquamarine;
        border-radius: 6px;
    }

    #close-cropper {
        font-weight: bold;
        font-size: 28px;
        position: absolute;
        color: #fff;
        text-decoration: none;
        top: 10px;
        padding: 3px 9px;
        border: 1px solid #fff;
        border-radius: 50%;
    }

    #close-cropper:hover {
        color: #d2d2d2;
        border: 1px solid #d2d2d2;
    }
</style>