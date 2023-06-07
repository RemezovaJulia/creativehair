<script>
    async function getAppointments() {
        const request = await fetch('dashboard/get-open-appointments', {
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
        return request.json()
    }
    function normalizeDate(date) {
        const regex = /^(\d+)-(\d+)-(\d+)T(\d+):(\d+)/;

        const match = regex.exec(date);
        return match ? `${match[3]}.${match[2]}.${match[1]} ${match[4]}:${match[5]}` : date
    }
    async function cancelAppointment(ev) {
        const id = ev.target.parentNode.id.split('_')

        const data = {
            "ID": parseInt(id[1]),
            "date":id[2].replace(/[A-Z]+\d+:.+/,''),
            "time_slot":id[2].replace(/\d+-\d+-\d+[A-Za-z]|:\d{2}[A-Za-z]+/g, '')
        }

        fetch('dashboard/cancel-appointment', {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                Appointments = getAppointments()
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    async function closeAppointment(ev){
        const id = ev.target.parentNode.id.split('_')

        const data = {
            "ID": parseInt(id[1]),
            "date":id[2].replace(/[A-Z]+\d+:.+/,''),
            "time_slot":id[2].replace(/\d+-\d+-\d+[A-Za-z]|:\d{2}[A-Za-z]+/g, '')
        }

        fetch('dashboard/close-appointment', {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                Appointments = getAppointments()
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    let Appointments
    $: {
        Appointments = getAppointments()
    }

</script>
<div class="appointments-wrapper">
    {#await Appointments}
        ...
    {:then appointments}
        {#each appointments as appointment}
            <div class="appointment-card">
                <p class="client-name">Имя: {appointment.client_name}</p>
                <p class="client-phone">Тел: {appointment.client_phone}</p>
                <p class="client-email">email: {appointment.client_email}</p>
                <p class="client-timeslot">Время: {normalizeDate(appointment.appointment_time)}</p>
                <p class="create-at">Создано: {normalizeDate(appointment.create_at)}</p>
                <div class="btn-appointment" id="appointment_{appointment.Id}_{appointment.appointment_time}">
                    <a href="{'#'}"
                       class="appointment-cancel"
                       on:click|preventDefault={cancelAppointment}
                    >отменить</a>
                    <a href="{'#'}"
                       class="appointment-close"
                       on:click|preventDefault={closeAppointment}
                    >закрыть</a>
                </div>

            </div>
        {/each}
    {/await}
</div>