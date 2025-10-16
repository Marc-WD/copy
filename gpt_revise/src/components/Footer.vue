<template>
  <footer id="Footer">
    <!-- Top Panel -->
    <div class="foot-panel-2">
      <div class="container">
        <div class="row">
          <div class="col">
            <ul>
              <p>Explore</p>
              <RouterLink to="/explore">Travel Quiz</RouterLink>
              <RouterLink to="/explore">Budget Planner</RouterLink>
              <RouterLink to="/explore">Poll</RouterLink>
            </ul>
          </div>
          <div class="col">
            <ul>
              <p>Blog</p>
              <RouterLink to="/blog-post-home">Blogs</RouterLink>
            </ul>
          </div>
          <div class="col">
            <ul>
              <p>Services</p>
              <RouterLink to="/">Our Services</RouterLink>
            </ul>
          </div>
          <div class="col">
            <ul>
              <p>Company</p>
              <RouterLink to="/about">About us</RouterLink>
              <RouterLink to="/about">Contact</RouterLink>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Panel -->
    <div class="foot-panel-3">
      <div class="container">
        <div class="row">
          <div class="col text-center">
            <div class="copyright">
              &copy; 2024 by Travelog. All Rights Reserved. &copy; 2024 Travelog Developers. All Rights Reserved.
            </div>
            <div class="footer-icons">
              <i class="fab fa-github footer-icon"></i>
              <i class="fab fa-youtube footer-icon"></i>
              <i class="fab fa-linkedin footer-icon"></i>
              <i class="fab fa-facebook footer-icon"></i>
              <i class="fas fa-m footer-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Custom styles for the footer */
.foot-panel-1 {
    text-align: center;
    padding: 20px 0;
}

.foot-panel-2 {
    background-color: #f8f9fa;
    padding: 20px 0;
}

.foot-panel-2 ul {
    list-style-type: none;
    padding: 0;
}

.foot-panel-2 p {
    font-weight: bold;
}

.foot-panel-2 a {
    display: block;
    color: #000;
    text-decoration: none;
    margin: 5px 0;
}

.foot-panel-2 a:hover {
    text-decoration: underline;
}

.foot-panel-3 {
    background-color: #343a40;
    color: white;
    padding: 10px 0;
}

.copyright {
    margin-bottom: 10px;
}

.footer-icons .footer-icon {
    margin: 0 10px;
    color: white;
    font-size: 1.5rem;
}

.footer-icons .footer-icon:hover {
    color: #007bff;
}

.contact p {
    font-weight: bold;
    margin-top: 10px;
}
</style>
