<script>
    import {toggle} from "./menu.toggle.js";
    import {link} from "svelte-spa-router";

    export let menuItems = []

    function openSubmenu(event) {
        const target = event.currentTarget;
        const data = target.getAttribute('data-isShow')
        const isShow = data === 'true';
        const closeIcon = target.childNodes[1]
        const submenu = target.nextElementSibling
        if (!isShow) {
            submenu.style.display = "block"
            closeIcon.classList.remove('icon-down-circle')
            closeIcon.classList.add('icon-right-circle')
        } else {
            submenu.style.display = "none"
            closeIcon.classList.remove('icon-right-circle')
            closeIcon.classList.add('icon-down-circle')
        }
        target.setAttribute('data-isShow', !isShow);
    }

    const closeSidebar = () => window.innerWidth < 1024 && toggle();
</script>
{#each menuItems as item}
    {#if item.subItems}
        <li class="sidebar-item has-submenu">
            <a href={'#'} class="sidebar-link {item.icon ?? ''}" data-isShow="false"
               on:click|preventDefault|stopPropagation={openSubmenu}>
                {item.name}<span class="has-submenu-icon icon-down-circle"></span>
            </a>
            <ul class="submenu">
                <svelte:self menuItems={item.subItems}/>
            </ul>
        </li>
    {:else}
        <li class="sidebar-item">
            <a href="{item.link}" class="sidebar-link {item.icon ?? ''}"
               on:click|preventDefault={closeSidebar} use:link>
                {item.name}
            </a>
        </li>
    {/if}
{/each}