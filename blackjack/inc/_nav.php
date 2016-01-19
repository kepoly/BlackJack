<div class="container" ng-init="goLive('<?php echo $_SESSION['user_name']; ?>')">
<nav class="navbar navbar-inverse mainNav">
  <div class="navbar-header">
    <div class="topMenu">
    <a href="/gcon/">HOME</a>
    <a href="directory/">DIRECTORY</a>
    <a href="pages/faq">FAQ</a>
        <?php
        if($_SESSION['user_logged_in'] == 1) {
            ?>
            <a href="" ng-click="clicked = !clicked" data-toggle="collapse" data-target=".navbar-collapse"><?php echo $_SESSION['user_name']; ?></a>
            <?php
        } else {
            ?>
            <a href="" ng-click="clicked = !clicked" data-toggle="collapse" data-target=".navbar-collapse">ACCOUNT</a>
            <?php
        }
        ?>
      </div>

  </div>
  <div class="navbar-collapse collapse">
    <p class="navbar-text">
      Account Options: <?php echo $_SESSION['user_name']; ?>
    </p>
    <ul class="nav navbar-nav dropDown">
      <?php if($_SESSION['user_logged_in'] == 1) { ?>
        <li ng-click="openLogin()"><a href="#">Profile</a></li>
        <li ng-click="openRegister()"><a href="#about">Messages</a></li>
        <li ng-click="openPass()"><a href="#contact">Help</a></li>
        <li><a href="index.php?logout=yes">Log Out</a></li>
     <?php }  else { ?>
        <li ng-click="openLogin()"><a href="#">Sign In</a></li>
        <li ng-click="openRegister()"><a href="#about">Register</a></li>
        <li ng-click="openPass()"><a href="#contact">Forgot Password</a></li>
        <li><a href="#contact">Reset Guest</a></li>

        <?php
      }
      ?>
    </ul>
  </div>
</nav>
</div>

