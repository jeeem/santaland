var santaNavButton = document.getElementById('navMenuButton');
var santaNavMenuIcon = document.getElementById('navMenuIcon');
var santaNavCloseIcon = document.getElementById('navCloseIcon');
var navMenuContent = document.getElementById('navMenuContent');
var theExperienceNavButton = document.getElementById('theExperienceNavButton');
var navBookNowButton = document.getElementById('navBookNowButton');
var videosNavButton = document.getElementById('videosNavButton');

function scrolldiv(idToScrollTo) { 
  var elem = document.getElementById(idToScrollTo);
  elem.scrollIntoView({behavior: "smooth"}); 
} 

var santaCloseNav = function() {
  document.body.classList.remove('nav-active');
  navMenuContent.classList.remove('navMenuContent--visible');
  santaNavMenuIcon.classList.remove('navIcon--hidden');
  santaNavCloseIcon.classList.add('navIcon--hidden');
}

var santaOpenNav = function() {
  document.body.classList.add('nav-active');
  navMenuContent.classList.add('navMenuContent--visible');
  santaNavMenuIcon.classList.add('navIcon--hidden');
  santaNavCloseIcon.classList.remove('navIcon--hidden');
}

var santaToggleNav = function() {
    // close nav
    if (santaNavMenuIcon.classList.contains('navIcon--hidden')) {
      santaCloseNav()
    } else {
      // open nav
      santaOpenNav()
    }
}

santaNavButton.onclick = santaToggleNav;
theExperienceNavButton.onclick = function() {
  santaToggleNav();
  scrolldiv('theExperienceSection');
}
videosNavButton.onclick = function() {
  santaToggleNav();
  scrolldiv('videosSection');
}
navBookNowButton.onclick = function() {
  santaCloseNav();
  scrolldiv('bookingSection');
}

var videoSantaThumb = document.getElementById('video-thumb-santa');
var videoElfThumb = document.getElementById('video-thumb-elf');
var videoContainer = document.getElementById('video-embed-container');
var videoIframe = videoContainer.querySelector('iframe');
videoSantaThumb.onclick = function() {
  videoContainer.classList.add('video-embed-container--visible')
  videoIframe.src='https://www.youtube.com/embed/7d5rKjvhQvg';
  scrolldiv('video-embed-container');
}
videoElfThumb.onclick = function() {
  videoContainer.classList.add('video-embed-container--visible')
  videoIframe.src='https://www.youtube.com/embed/9zBwXop5fAk';
  scrolldiv('video-embed-container');
}
// santa: https://www.youtube.com/embed/7d5rKjvhQvg
// elf: https://www.youtube.com/embed/9zBwXop5fAk