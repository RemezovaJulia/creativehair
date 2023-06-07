<script>
    async function getAppointments() {
        const request = await fetch('dashboard/get-close-appointments', {
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
            </div>
        {/each}
    {/await}
</div>