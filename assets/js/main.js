/**
* Template Name: BizLand
* Template URL: https://bootstrapmade.com/bizland-bootstrap-business-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

var swiper = new Swiper('.swiper-container', {
  loop: true,
  autoplay: {
    delay: 3000, // Change the delay as needed
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// new js



document.addEventListener("DOMContentLoaded", function () {
  const servicesPerPage = 6; // Number of services to show per page
  let currentPage = 1;
  const services = [
    // Example service data; replace with your actual data
    { id: 1, title: 'Certificate Services', icon: 'bi-award', description: 'Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi', details: 'Detailed information about Certificate Services.' },
    { id: 2, title: 'Identification & Documentation', icon: 'bi-file-text', description: 'Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi', details: 'Detailed information about Identification & Documentation.' },
    { id: 3, title: 'Utility Bills & Services', icon: 'bi-receipt', description: 'Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi', details: 'Detailed information about Utility Bills & Services.' },
    // Add more services with detailed information
  ];

  function renderServices(page) {
    const startIndex = (page - 1) * servicesPerPage;
    const endIndex = page * servicesPerPage;
    const paginatedServices = services.slice(startIndex, endIndex);
    const serviceList = document.getElementById("more-service-list");
    serviceList.innerHTML = '';

    paginatedServices.forEach(service => {
      serviceList.innerHTML += `
        <div class="col-xl-3 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="100">
          <div class="service-item position-relative" data-service-id="${service.id}">
            <div class="icon">
              <i class="bi ${service.icon} icon"></i>
            </div>
            <h4><a href="#" class="stretched-link">${service.title}</a></h4>
            <p>${service.description}</p>
          </div>
        </div>
      `;
    });
  }

  function renderPagination() {
    const totalPages = Math.ceil(services.length / servicesPerPage);
    const pagination = document.getElementById("more-pagination");
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      pagination.innerHTML += `
        <a href="#" class="btn custom-btn${i === currentPage ? ' active' : ''}" data-page="${i}">${i}</a>
      `;
    }
  }

  function renderServiceDetails(service) {
    const serviceDetails = document.getElementById("service-details");
    serviceDetails.innerHTML = `
      <div class="service-detail-item">
        <h3>${service.title}</h3>
        <div class="icon">
          <i class="bi ${service.icon} icon"></i>
        </div>
        <p>${service.details}</p>
      </div>
    `;
  }

  document.getElementById("more-pagination").addEventListener("click", function (event) {
    if (event.target.matches(".btn")) {
      currentPage = parseInt(event.target.getAttribute("data-page"));
      renderServices(currentPage);
      renderPagination();
    }
  });

  document.getElementById("more-service-list").addEventListener("click", function (event) {
    const serviceItem = event.target.closest(".service-item");
    if (serviceItem) {
      const serviceId = parseInt(serviceItem.getAttribute("data-service-id"));
      const selectedService = services.find(service => service.id === serviceId);
      renderServiceDetails(selectedService);
    }
  });

  renderServices(currentPage);
  renderPagination();
});


// code for instagram posts
document.addEventListener('DOMContentLoaded', function() {
  const postsContainer = document.getElementById('posts-container');

  function fetchAndDisplayPosts() {
      fetch('https://brucebitchx.github.io/enteakshaya-demo/assets/json/instagram-posts.json') // Path to your JSON file
          .then(response => response.json())
          .then(posts => {
              populatePosts(posts);
          })
          .catch(error => {
              console.error('Error fetching posts:', error);
          });
  }

  function populatePosts(posts) {
      postsContainer.innerHTML = ''; // Clear existing posts
      posts.forEach(post => {
          const postCol = document.createElement('div');
          postCol.className = 'col-lg-4 col-md-6 d-flex align-items-stretch';

          const postCard = document.createElement('div');
          postCard.className = 'team-member';

          const memberImg = document.createElement('div');
          memberImg.className = 'member-img';

          // Create Instagram embed iframe
          const iframe = document.createElement('iframe');
          iframe.src = `https://www.instagram.com/p/${extractShortcode(post.url)}/embed`;
          iframe.frameBorder = '0';
          iframe.scrolling = 'no';
          iframe.allowTransparency = 'true';
          iframe.style.width = '100%';
          iframe.style.height = '600px';

          memberImg.appendChild(iframe);

          const socialDiv = document.createElement('div');
          socialDiv.className = 'social';

          const instaLink = document.createElement('a');
          instaLink.href = post.url;
          instaLink.target = '_blank';
          instaLink.innerHTML = '<i class="bi bi-instagram"></i>';

          socialDiv.appendChild(instaLink);

          postCard.appendChild(memberImg);
          postCard.appendChild(socialDiv);

          postCol.appendChild(postCard);
          postsContainer.appendChild(postCol);
      });

      // Initialize Instagram embeds
      if (window.instgrm) {
          window.instgrm.Embeds.process();
      } else {
          const script = document.createElement('script');
          script.async = true;
          script.src = 'https://www.instagram.com/embed.js';
          script.onload = () => window.instgrm.Embeds.process();
          document.body.appendChild(script);
      }
  }

  function extractShortcode(url) {
      const match = url.match(/\/reel\/([^\/]+)/);
      return match ? match[1] : '';
  }

  fetchAndDisplayPosts(); // Fetch and display posts when the DOM is loaded
});
