<script>
    import {onMount} from "svelte";
    import MaskInput from 'svelte-input-mask/MaskInput.svelte';

    let calendar;
    let isAccepted = false
    const errors = {
        'Имя должно содержать больше 2 символов': true,
        'телефон должен быть формата +7(XXX)-XXX-XX-XX': true,
        "неверный формат email!": true
    }
    let sendBtn
    let errMsg

    function printErrors() {
        let msg = ``
        for (const error in errors) {
            msg += `${error}</br>`
        }
        return msg
    }

    function renderCalendar(data) {
        try {
            const obj = data;
            const weekends = obj['weekends'];
            const calendar = obj['calendar'];
            const workDays = getWorkDays(weekDays, weekends);
            let html = '<thead><tr>';

            // Создаем заголовки с рабочими днями
            for (let j = 0; j < workDays.length; j++) {
                const workDay = workDays[j];
                html += `<th class="day-label ${colorizeDay(weekDays.indexOf(workDay))}">${workDay}</th>`;
            }
            html += '</tr></thead><tbody>';

            let currentMonth = '';
            let previousDate = null;
            // Создаем строки для каждой недели и ячейки для каждого дня
            for (let i = 0; i < calendar.length; i++) {
                const date = calendar[i]['Date'];
                const month = months[getDateMonth(date)];
                const day = getDateDay(date);

                if (currentMonth !== month) {
                    if (currentMonth !== '') {
                        // Если это не первый месяц, закрываем предыдущий месяц
                        html += '</tr>';
                    }
                    html += `<tr class="month">
                   <td colspan="${weekDays.length - weekends.length}">${month}</td>
                 </tr><tr>`;
                    // Добавляем пустые ячейки, если месяц начинается не с понедельника
                    const offset = workDays.indexOf(weekDays[day])
                    for (let j = 0; j < offset; j++) {
                        html += '<td class="td-empty"></td>';
                    }
                    currentMonth = month;
                }

                // Проверяем, если есть пропущенные даты между текущей и предыдущей датами
                if (previousDate && getDateNumber(date) - getDateNumber(previousDate) > 1) {
                    const missingDays = getDateNumber(date) - getDateNumber(previousDate) - 1;
                    // Проверяем каждый пропущенный день
                    for (let j = 1; j <= missingDays; j++) {
                        const missingDate = new Date(previousDate);
                        missingDate.setDate(missingDate.getDate() + j); // Получаем следующую дату
                        if (!weekends.includes(getDateDay(missingDate))) {
                            html += '<td class="td-empty"></td>'; // Добавляем пустую ячейку для рабочего дня
                        }
                    }
                }

                // Вставляем число дня в соответствующую ячейку
                html += `<td id="item-num-${i}" class="${colorizeDay(getDateDay(date))}">
                        ${getDateNumber(date)}
                </td>`;

                previousDate = date; // Сохраняем текущую дату как предыдущую

                // Закрываем строку и начинаем новую после последнего дня в недели.
                if (day === weekends[weekends.length - 1] - 1) {
                    html += '</tr><tr>';
                }
            }

            html += '</tr></tbody>';
            return html;
        } catch (e) {
            return e.message;
        }
    }


    const getCalendar = async () => {
        const request = await fetch('/get-calendar', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Headers-change': 'change user data'
            },

        })
        if (!request.ok) {
            const errorText = await request.text();
            throw new Error(errorText);
        }
        return request.json();
    }

    let htmlCalendar;
    let userData;

    let isUserSelected = false
    let isTimeSlotSelected = false
    let CustomersChoice = {}
    let appointmentsInputs;
    let getData
    let popupCalendar;
    onMount(async () => {
        errMsg = document.querySelector('#error-form-msg');
        sendBtn = document.querySelector('#send');
        getData = await getCalendar()
        appointmentsInputs = document.querySelectorAll('#appointments-inputs input')
        htmlCalendar = renderCalendar(getData)
        calendar = document.getElementById('calendar')
        const popup = document.getElementById('popup-calendar-wrapper')
        popupCalendar = document.getElementById('popup-calendar')
        let toggle = false
        calendar.addEventListener('click', ev => {
            const eTarget = ev.target
            if (eTarget.tagName !== 'TD' || !eTarget.id) return
            const getId = eTarget.id.split('-')
            const getItem = getId[getId.length - 1]
            toggle = !toggle
            if (toggle) {
                popup.style.display = 'block'
            }
            userData = getData['calendar'][getItem]

            const popupClickHandler = ev => {
                const eTarget = ev.target
                if (eTarget.tagName !== 'SPAN') return
                toggle = !toggle
                popup.style.display = 'none'
                isUserSelected = isTimeSlotSelected = false
                document.getElementById('employee_select').value = "all"
                CustomersChoice = {}
                popup.removeEventListener('click', popupClickHandler)
            }

            popup.addEventListener('click', popupClickHandler)
        })
    })

    $: {
        userData;
    }

    const getDateNumber = (fullDate) => (new Date(fullDate)).getDate()
    const getDateDay = (fullDate) => (new Date(fullDate)).getDay()
    const getDateMonth = (fullDate) => (new Date(fullDate)).getMonth()
    const weekDays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
    const getWorkDays = (weekDays, weekends) => weekDays.filter((_, index) => !weekends.includes(index));
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
        'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
    ]

    function colorizeDay(num) {
        switch (num) {
            case 1:
                return "monday"
            case 2:
                return "tuesday"
            case 3:
                return "wednesday"
            case 4:
                return "thursday"
            case 5:
                return "friday"
            case 6:
                return "saturday"
            case 0:
                return "sunday"
        }
    }


    const popupChangeHandler = ev => {
        if (!isUserSelected || !isTimeSlotSelected) {
            isTimeSlotSelected = false
        }

    }

    let timeSlots = [];
    const employeeSelectHandler = async ev => {
        const eTarget = ev.target
        isUserSelected = eTarget.value !== 'all'
        CustomersChoice[eTarget.id] = parseInt(eTarget.value)
        if (!isUserSelected) {
            delete CustomersChoice[eTarget.id]
            return
        }
        let data = {}
        data[eTarget.id] = parseInt(eTarget.value)
        data['date'] = eTarget.dataset.date
        const response = await sendRequest('/get-timeslot', 'POST', data)
        timeSlots = response['time_slots']['TimeSlots']
    }

    const timeSelectHandler = ev => {
        const eTarget = ev.target
        isTimeSlotSelected = eTarget.value !== 'time_none'

        CustomersChoice[eTarget.id] = eTarget.value
        if (!isTimeSlotSelected) {
            delete CustomersChoice[eTarget.id]
        }
    }

    const sendHandler = async ev => {
        const eTarget = ev.target
        CustomersChoice[eTarget.id] = eTarget.value
        appointmentsInputs = document.querySelectorAll('#appointments-inputs input')
        appointmentsInputs.forEach(inp => {
            if (inp.id === "") {
                CustomersChoice['client_phone'] = inp.value
            } else {
                CustomersChoice[inp.id] = inp.value
            }
        })
        const before = document.querySelector('.before')
        try {
            before.style.display = "flex"
            const response = await sendRequest('/accept-appointment', 'POST', CustomersChoice)
            isAccepted = true
            before.style.display = "none"
        } catch (e) {
            before.style.display = "none"
            console.log(e.message);
        }
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

    function convertToTimeFormat(input) {
        const hours = input.substring(11, 13);
        const minutes = input.substring(14, 16);

        return hours + ':' + minutes;
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

    function nameValidator(ev) {
        sendBtn = document.querySelector('#send')
        validator(ev.target, ev.target.value.length < 3,
            'Имя должно содержать больше 2 символов')
    }

    const handleChange = ({detail}) => {
        const value = detail.inputState.maskedValue;
        sendBtn = document.querySelector('#send')
        validator(detail.element, !value.match(/^\+7\(\d+\)-\d{3}-\d{2}-\d{2}$/),
            'телефон должен быть формата +7(XXX)-XXX-XX-XX')
    };

    function emailValidator(ev) {
        validator(ev.target, !ev.target.value.match(/^[a-zA-Z0-9-.]+@[a-zA-Z]+\.[a-zA-Z]+$/),
            "неверный формат email!")
    }

    function normalizeDate(date) {
        let parseDate = date.split('-')
        return `${parseDate[2]}.${parseDate[1]}.${parseDate[0]}`
    }
</script>

<div id="calendar-wrapper">
    <table id="calendar">
        {#if htmlCalendar}{@html htmlCalendar}{/if}
    </table>
</div>
<div id="popup-calendar-wrapper">
    <div id="popup-calendar" on:change={popupChangeHandler}>
        <div class="before">Загрузка...</div>
        <span id="close-popup">✕</span>
        {#if !isAccepted}
            {#if userData}
                <select id="employee_select" data-date="{userData['Date']}" on:change={employeeSelectHandler}>
                    <option value="all">Выберите Мастера</option>
                    {#each userData.EmployeesId as id, i}
                        <option value="{id}">{userData.EmployeesName[i]}</option>
                    {/each}
                </select>
            {/if}
            {#if isUserSelected}
                <select id="timeslot_select" on:change={timeSelectHandler}>
                    <option value="time_none">Выберите Время</option>
                    {#if timeSlots.length !== 0}
                        {#each timeSlots as slot}
                            <option value="{convertToTimeFormat(slot)}">{convertToTimeFormat(slot)}</option>
                        {/each}
                    {/if}
                </select>
            {/if}
            {#if isTimeSlotSelected && isUserSelected }
                <div id="appointments-inputs">
                    <label for="client_name">
                        <input type="text" id="client_name" placeholder="Имя"
                               on:change={nameValidator}>
                    </label>
                    <label for="client_phone">
                        <span id="client_phone">
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
                    <label for="client_email">
                        <input type="text" id="client_email" placeholder="email" on:change={emailValidator}>
                    </label>
                    <button id="send" disabled="disabled" value="{userData['Date']}"
                            on:click|preventDefault={sendHandler}>Записаться
                    </button>
                </div>
            {/if}
        {:else }
            <h1 id="is-accepted">{CustomersChoice['client_name']}, Вы записаны
                на {normalizeDate(CustomersChoice['send'])} {CustomersChoice['timeslot_select']}.
                Мы с вами свяжемся в ближайшее время!</h1>
        {/if}
        <div id="error-form-msg">

        </div>
    </div>
</div>