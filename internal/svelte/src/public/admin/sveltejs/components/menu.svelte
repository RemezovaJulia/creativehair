<script>
import {toggle} from './menu.toggle.js'
</script>

<nav id="employee-navbar">
  <ul id="employee-navbar-elem">
    <li><a href={'#'} id="employee-navbar-btn" on:click|preventDefault={toggle}>☰</a></li>
    <li>
      <a href="{'#'}" id="employee-notification">🕭 </a>
      <a href="/" id="employee-navbar-logo">CreativeHair</a>
    </li>
  </ul>
</nav>