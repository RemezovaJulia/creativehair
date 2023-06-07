<script>
    import { Images } from "svelte-gallery-fkn132";
    let images = [];
    const url = location.href.split('/')
    const id = url[url.length -1]
    console.log(id)
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
    async function getGallery(id) {
        const gallery = await sendRequest(`/user/${id}`,'POST', {id:parseInt(id)})
        gallery['gallery'].forEach(photo =>{
            images.push({src:photo.ImageURL})
        })
    }

</script>
{#await getGallery(id)}
    ...
{:then gallery}
    <Images {images} gutter={5} />
{/await}