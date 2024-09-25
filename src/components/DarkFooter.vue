<template>
  <footer class="dark-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Tennis Racket Marketplace</h3>
        <p>Your one-stop shop for all things tennis.</p>
      </div>
      <div class="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Products</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Contact Us</h3>
        <p>Email: info@tennisracketmarket.com</p>
        <p>Phone: (123) 456-7890</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2023 Tennis Racket Marketplace. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'DarkFooter'
}
</script>

<style scoped>
.dark-footer {
  background-color: #333;
  color: white;
  padding: 2rem 0;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  margin-bottom: 1rem;
}

.footer-section h3 {
  margin-bottom: 0.5rem;
}

.footer-section ul {
  list-style-type: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #ccc;
  text-decoration: none;
}

.footer-section a:hover {
  color: white;
}

.footer-bottom {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #555;
}
</style>