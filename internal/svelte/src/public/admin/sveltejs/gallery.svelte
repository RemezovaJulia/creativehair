<script>
    import { Images } from "svelte-gallery-fkn132";
    let images = [];

    async function getGallery() {
        const response = await fetch('/get-gallery', {
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
        const gallery = await response.json()
        gallery.forEach(photo =>{
            images.push({src:photo.ImageURL})
        })
    }
</script>

{#await getGallery()}
    ...
{:then gallery}
    <Images {images} gutter={5} />
{/await}