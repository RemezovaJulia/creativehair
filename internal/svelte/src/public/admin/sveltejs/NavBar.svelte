<script>
  let isOpen = false;
  function openMenu(event){
    if (!isOpen){
      event.target.nextElementSibling.style.display = "flex"
      isOpen = true;
    } else {
      event.target.nextElementSibling.style.display = "none"
      isOpen = false;
    }
  }
</script>
<div class="logo">LOGO</div>
<a href="{'#'}" id="menu" on:click|preventDefault={openMenu}>☰</a>
<ul id="nav__bar_list">
  <li>menu item 1</li>
  <li>menu item 2</li>
  <li>menu item 3</li>
  <li>menu item 4</li>
  <li>menu item 5</li>
</ul>

<style>
  #menu{
    font-size: 30px !important;
    user-select: none;
    cursor: pointer;
    text-decoration: none;
  }

  #nav__bar_list  {
    list-style: none;
    display: none;
    margin: 0;
  }
  #nav__bar_list > li{
    margin: 0 5px;
  }
  .logo{
    flex-grow: 1;
    flex-shrink: 0;
  }
</style>