window.addEventListener("DOMContentLoaded", function() {
    var navLinks = document.querySelectorAll("nav ul li a");
  
    navLinks.forEach(function(link) {
      link.addEventListener("click", function(e) {
        e.preventDefault();
        var sectionId = link.getAttribute("href");
        scrollToSection(sectionId);
      });
    });
  
    function scrollToSection(sectionId) {
      var section = document.querySelector(sectionId);
      var sectionOffset = section.offsetTop - 60; // Adjust the offset as needed
  
      window.scrollTo({
        top: sectionOffset,
        behavior: "smooth"
      });
    }
  });
  