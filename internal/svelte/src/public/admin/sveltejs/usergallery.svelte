<script>
    async function getGallery() {
        const request = await fetch('dashboard/get-gallery', {
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

    function uploadPhotos() {
        const fileInput = document.getElementById('photoInput');
        const files = fileInput.files;
        if (files.length < 1) return

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('photos', files[i]);
        }

        fetch('dashboard/add-photos', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                fileInput.value = ""
                gallery = getGallery()
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    async function removePhoto(ev) {
        const data = {
            "ID": parseInt(ev.target.id)
        }

        fetch('dashboard/remove-photo', {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                gallery = getGallery()
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    let gallery
    $: {
        gallery = getGallery()
    }
</script>

<div class="form-wrapper">
    <form action="" method="post">
        <input type="file" id="photoInput" multiple>
        <button on:click|preventDefault={uploadPhotos}>Upload</button>
    </form>
</div>

<div class="gallery">
    {#await gallery}
        ...
    {:then photos}
        {#each photos['gallery'] as photo}
            <div class="img-wrapper">
                <img src="{photo.ImageURL}" alt="">
                <a href="{'#'}" class="remove-photo" id="{photo.ID}" on:click|preventDefault={removePhoto}>✕</a>
            </div>
        {/each}
    {:catch e}
        {e}
    {/await}
</div>

<style>
    .img-wrapper {
        width: 200px;
        margin: 5px;
        position: relative;
    }

    .remove-photo {
        position: absolute;
        left: 42%;
        top: 30%;
        background: #ffffff94;
        padding: 5px 10px;
        border-radius: 50%;
        text-decoration: none;
        font-size: 20px;
        font-weight: bold;
        color: red;
    }

    .gallery {
        padding: 20px 10px;
        display: flex;
        justify-content: center;
    }
    img {
        border-radius: 8px;
    }
    button {
        margin: 5px;
    }
</style>