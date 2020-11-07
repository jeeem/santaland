var santaNavButton = document.getElementById('navMenuButton');
var santaNavMenuIcon = document.getElementById('navMenuIcon');
var santaNavCloseIcon = document.getElementById('navCloseIcon');
var navMenuContent = document.getElementById('navMenuContent');
var theExperienceNavButton = document.getElementById('theExperienceNavButton');
function scrolldiv(idToScrollTo) { 
  var elem = document.getElementById(idToScrollTo);
  elem.scrollIntoView({behavior: "smooth"}); 
} 

var santaToggleNav = function() {
    // close nav
    if (santaNavMenuIcon.classList.contains('navIcon--hidden')) {
      document.body.classList.remove('nav-active');
      navMenuContent.classList.remove('navMenuContent--visible');
      santaNavMenuIcon.classList.remove('navIcon--hidden');
      santaNavCloseIcon.classList.add('navIcon--hidden');
    } else {
      // open nav
      document.body.classList.add('nav-active');
      navMenuContent.classList.add('navMenuContent--visible');
      santaNavMenuIcon.classList.add('navIcon--hidden');
      santaNavCloseIcon.classList.remove('navIcon--hidden');
    }
}

santaNavButton.onclick = santaToggleNav;
theExperienceNavButton.onclick = function() {
  santaToggleNav();
  scrolldiv('theExperienceSection');
}