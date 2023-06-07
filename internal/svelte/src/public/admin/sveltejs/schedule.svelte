<script>
    import {onMount} from "svelte";

    let inputs;
    let dropDown;
    let workSchedule = {}
    const weekend = {
        '1': {day: 'Понедельник', checked: ''},
        '2': {day: 'Вторник', checked: ''},
        '3': {day: 'Среда', checked: ''},
        '4': {day: 'Четверг', checked: ''},
        '5': {day: 'Пятница', checked: ''},
        '6': {day: 'Суббота', checked: ''},
        '0': {day: 'Воскресенье', checked: ''},
    }
    onMount(() => {
        (async () => {
            const response = await fetch('dashboard/schedule', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Headers-change': 'change user data'
                },
            })

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const jsonData = await response.json()
            let {open, close, haircut_interval, weekend_days} = jsonData;
            const convertForHtmlTime = (microseconds) => {
                const date = new Date(microseconds / 1000);
                const hour = String(date.getUTCHours()).padStart(2, '0');
                const minutes = String(date.getUTCMinutes()).padStart(2, '0')
                return `${hour}:${minutes}`
            }

            open = convertForHtmlTime(open['Microseconds'])
            close = convertForHtmlTime(close['Microseconds'])
            haircut_interval = (new Date(haircut_interval['Microseconds'] / 1000)).getUTCHours()
            workSchedule = {
                open,
                close,
                haircut_interval,
                weekend_days
            }
            workSchedule.weekend_days.forEach(day => {
                weekend[day].checked = 'checked'
            })
        })()

        inputs = document.querySelectorAll('input')
        dropDown = document.querySelector('.dropdown-weekend')
    });


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

    let isOpen = false

    function dropDownHandler() {
        isOpen = !isOpen
        dropDown.style.display = isOpen ? 'flex' : 'none'
    }

    function peekWeekends(ev) {
        const day = ev.target.id.split('-')[1]
        weekend[day].checked = weekend[day].checked === '' ? 'checked' : ''
    }

    let error = ''

    async function changeSchedule() {
        let data = {}
        let weekendChecked = []
        inputs.forEach(inp => {
            let key = inp.id.split('-')[1]
            if (inp.type === 'checkbox') {
                if (inp.checked) weekendChecked.push(parseInt(key))
            } else {
                if (inp.value !== '') data[key] = inp.value
            }
        })

        if (weekendChecked.length > 0) data['weekend_days'] = weekendChecked
        try {
            await sendRequest('dashboard/schedule', 'PUT', data)
            error = `<span style="color: #2beea3">изменено</span>`
        } catch (e) {
            error = `<span style="color: #ff2e7f">Ошибка: ${e.message}</span>`
        }
    }

</script>
<div id="work_schedule">
  <h1>График работы:</h1>

  <div class="schedule_wrapper">
    <label for="schedule-weekend" id="dropdown-wrapper">
      <a href="{'#'}" id="schedule-weekend" on:click|preventDefault={dropDownHandler}>Выходные дни</a>
      <span class="dropdown-weekend">
            {#each Object.entries(weekend) as [key, value]}
              <label for={`day-${key}`}>
                {value.day}
                <input type="checkbox" id="{`day-${key}`}" checked={value.checked} on:change={peekWeekends}>
              </label>
            {/each}
        </span>
    </label>
    <label for="schedule-open">
      открытие:
      <input type="time" id="schedule-open"
             value="{workSchedule?.open|| ''}">
    </label>
    <label for="schedule-close">
      закрытие:
      <input type="time" id="schedule-close"
             value="{workSchedule?.close || ''}">
    </label>
    <label for="schedule-haircut_interval">
      Интервал между стрижками:
      <input type="number" id="schedule-haircut_interval"
             value="{workSchedule?.haircut_interval || ''}">
      в часах
    </label>
  </div>
  <div class="error">
    {@html error}
  </div>
  <button id="change-schedule" on:click={changeSchedule}>изменить</button>
</div>