<script>
    import Menu from './components/menu.svelte'
    import {visible} from './components/menu.toggle.js'
    import Sidebar from './components/sidebar.svelte'
    import {fly} from 'svelte/transition';
    import Router from 'svelte-spa-router'
    import {routes} from "./components/routes";
</script>


<Menu/>
<div id="employee-navbar-collapse">
  {#if $visible}
    <ul id="employee-sidebar" transition:fly="{{ x: -500, duration: 250 }}" style:display={$visible ? 'block' : 'none'}>
      <Sidebar/>
      <li class="sidebar-item">
        <a href="/logout" class="sidebar-link">Выход</a>
      </li>
    </ul>
  {/if}
  <div id="item">
    <Router {routes}/>

  </div>
</div>

