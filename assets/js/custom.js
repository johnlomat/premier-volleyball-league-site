import Swiper from "swiper/bundle";
import "bootstrap/dist/js/bootstrap.min.js";
import "fslightbox";
import "leaflet/dist/leaflet.js";
import InfiniteScroll from "infinite-scroll";
import Isotope from "isotope-layout";

(() => {
  // Debounce
  const debounce = (callback, wait) => {
    let timeoutId = null;

    return (...args) => {
      window.clearTimeout(timeoutId);

      timeoutId = window.setTimeout(() => {
        callback.apply(null, args);
      }, wait);
    };
  };

  // Class function
  const elementClass = {
    add: (el, className) => {
      let element = document.querySelector(el);

      element.classList.add(className);
    },

    remove: (el, className) => {
      let element = document.querySelector(el);

      element.classList.remove(className);
    },

    toggle: (el, className) => {
      let element = document.querySelector(el);

      element.classList.toggle(className);
    },
  };

  // Navbar toggle button
  const navbarCollapse = document.querySelector("#navbarText");

  const navbarToggle = () => {
    elementClass.toggle(".pvl-header", "is-collapsed");
    elementClass.toggle(".bi.bi-list", "text-white");
  };

  navbarCollapse.addEventListener("hide.bs.collapse", () => {
    navbarToggle();
  });

  navbarCollapse.addEventListener("show.bs.collapse", () => {
    navbarToggle();
  });

  // Latest news, Match schedule, Match recap slider
  var swiper = new Swiper(".swiper.cards-slider", {
    slidesPerView: "auto",
    lazy: true,
    spaceBetween: 25,
    grabCursor: true,
    breakpoints: {
      576: {
        slidesPerView: "auto",
      },
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },
    navigation: {
      nextEl: ".swiper.cards-slider .swiper-button-next",
      prevEl: ".swiper.cards-slider .swiper-button-prev",
    },
    on: {
      init: () => {
        let swiperSlider = document.querySelectorAll(".swiper");

        if (swiperSlider) {
          swiperSlider.forEach((item) => {
            item.style.visibility = "visible";
          });
        }
      },
    },
  });

  // Featured videos slider
  var swiper = new Swiper(".swiper.featured-videos", {
    slidesPerView: "auto",
    lazy: true,
    spaceBetween: 25,
    grabCursor: true,
    breakpoints: {
      576: {
        slidesPerView: "auto",
      },
      768: {
        slidesPerView: 2,
      },
    },
    navigation: {
      nextEl: ".swiper.featured-videos .swiper-button-next",
      prevEl: ".swiper.featured-videos .swiper-button-prev",
    },
  });

  // Player of the game slider
  var swiper = new Swiper(".swiper.player-of-the-game", {
    slidesPerView: 1,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      nextEl: ".swiper.player-of-the-game .swiper-button-next",
      prevEl: ".swiper.player-of-the-game .swiper-button-prev",
    },
  });

  // Brackets scroll horizontal
  var swiper = new Swiper(".swiper.brackets", {
    slidesPerView: "auto",
    freeMode: true,
    grabCursor: true,
    on: {
      init: () => {
        let swiperSlider = document.querySelectorAll(".swiper");

        if (swiperSlider) {
          swiperSlider.forEach((item) => {
            item.style.visibility = "visible";
          });
        }
      },
    },
  });

  // Player stats card slider
  var swiper = new Swiper(".swiper.player-stats-cards", {
    slidesPerView: "auto",
    lazy: true,
    spaceBetween: 30,
    grabCursor: true,
    navigation: {
      nextEl: ".swiper.player-stats-cards .swiper-button-next",
      prevEl: ".swiper.player-stats-cards .swiper-button-prev",
    },
  });

  // All teams slider
  var swiper = new Swiper(".swiper.all-teams", {
    loop: true,
    lazy: true,
    spaceBetween: 5,
    grabCursor: true,
    centeredSlides: true,
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 5,
      },
    },
  });

  // Isotope filtering
  const isotopeFilter = {
    filterButton: () => {
      return ".iso-filter-button";
    },
    label: () => {
      document.body.addEventListener("click", function (event) {
        if (event.target.matches(isotopeFilter.filterButton())) {
          let label = event.target.getAttribute("data-label"),
            filterLabel = document.querySelector(".iso-filter-label");

          filterLabel.textContent = label;
        } else {
          return;
        }
      });
    },
    arrange: () => {
      document.body.addEventListener("click", function (event) {
        if (event.target.matches(isotopeFilter.filterButton())) {
          let filterValue = event.target.getAttribute("data-filter");

          iso.arrange({ filter: filterValue });
        } else {
          return;
        }
      });
    },
    match: () => {
      // quick search regex
      let qsRegex;
      let filterSelector = "*";

      // use value of search field to filter
      let quicksearch = document.querySelector(".iso-filter-quicksearch");
      if (quicksearch) {
        quicksearch.addEventListener(
          "keyup",
          debounce(() => {
            qsRegex = new RegExp(quicksearch.value, "gi");

            let filterLabel = document.querySelector(".iso-filter-label");

            if (quicksearch.value == "") {
              filterLabel.textContent = quicksearch.getAttribute("data-default-label");
            } else {
              filterLabel.textContent = `Search for "${quicksearch.value}"`;
            }

            iso.arrange({
              filter: (itemElem) => {
                var search = qsRegex ? itemElem.textContent.match(qsRegex) : true;
                var filterRes = filterSelector != "*" ? itemElem.dataset.cat.includes(filterSelector) : true;

                return search && filterRes;
              },
            });
          }, 100)
        );
      }
    },
  };

  // Teams page isotope filtering
  const playerPool = document.querySelector(".player-pool-grid");

  if (playerPool) {
    var iso = new Isotope(playerPool, {
      itemSelector: ".player-grid-item",
      layoutMode: "fitRows",
    });
  }

  // Teams logo slider
  var swiper = new Swiper(".swiper.teams-logo", {
    initialSlide: 6,
    lazy: true,
    grabCursor: true,
    slidesPerView: 2,
    spaceBetween: 30,
    centeredSlides: true,
    slideToClickedSlide: true,
    breakpoints: {
      576: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 6,
      },
      1200: {
        slidesPerView: 8,
      },
    },
    on: {
      init: isotopeFilter.match(),
      init: () => {
        let quicksearch = document.querySelector(".iso-filter-quicksearch");
        if (quicksearch) {
          quicksearch.addEventListener("keyup", () => {
            let teamsLogo = document.querySelectorAll(".teams-logo img");

            teamsLogo.forEach((item) => {
              item.classList.remove("opacity-100");
            });
          });
        }
      },
      init: () => {
        let swiperSlider = document.querySelectorAll(".swiper");

        if (swiperSlider) {
          swiperSlider.forEach((item) => {
            item.style.visibility = "visible";
          });
        }
      },
      click: isotopeFilter.arrange(),
      click: isotopeFilter.label(),
      click: (swiper.activeIndex = () => {
        // Active button
        document.body.addEventListener("click", function (event) {
          if (event.target.matches(isotopeFilter.filterButton())) {
            let teamsLogo = document.querySelectorAll(".teams-logo img"),
              quicksearch = document.querySelector(".iso-filter-quicksearch");

            teamsLogo.forEach((logo) => {
              logo.classList.remove("opacity-100");
            });

            event.target.classList.add("opacity-100");

            quicksearch.value = "";
          } else {
            return;
          }
        });
      }),
    },
  });

  // Infinite scroll news
  const newsPosts = document.querySelector(".news-posts-container");

  if (newsPosts) {
    let currentRecord = newsPosts.children.length;

    let infScroll = new InfiniteScroll(newsPosts, {
      path: function () {
        return `https://pvl.ph/news/loadmore`;
      },
      responseBody: "json",
      status: ".page-load-status",
      scrollThreshold: 0,
      history: false,
      fetchOptions: {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "group_no=51",
      },
    });

    // use element to turn HTML string into elements
    let proxyElem = document.createElement("div");

    infScroll.on("load", function (body) {
      let records = body,
        recordPaginate = currentRecord * infScroll.loadCount,
        recordPaginateRange = recordPaginate + currentRecord,
        recordSlice = records.slice(recordPaginate, recordPaginateRange);

      if (recordSlice.length !== 0) {
        let records = recordSlice;

        var itemsHTML = records.map(getNewsPost).join("");

        proxyElem.innerHTML = itemsHTML;

        newsPosts.append(...proxyElem.children);
      } else {
        infScroll.destroy();
      }
    });

    function getNewsPost({ title, date_posted, image_local }) {
      return `
      <div class="col">
        <div class="card text-white overflow-hidden">
          <a href="news-single.html" class="text-white">
            <div class="ratio ratio-4x3">
              <img src="${image_local}" class="card-img object-fit-cover img-fluid" alt="${title}" width="493" height="207" />
            </div>
            <div class="card-img-overlay bg-gradient row align-items-end">
              <div class="col">
                <h2 class="card-title fs-8 fw-bold mb-0">${title}</h2>
              </div>
              <div class="col-auto">
                <span class="card-text fs-5">${date_posted}</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    `;
    }
  }

  // Infinite scroll videos
  const videosPosts = document.querySelector(".videos-posts-container");

  if (videosPosts) {
    let currentRecord = videosPosts.children.length;

    let infScroll = new InfiniteScroll(videosPosts, {
      path: function () {
        return `https://pvl.ph/loadmorevideos`;
      },
      responseBody: "json",
      status: ".page-load-status",
      scrollThreshold: 0,
      history: false,
      elementScroll: videosPosts.getAttribute("data-element-scroll") == null ? false : `.${videosPosts.getAttribute("data-element-scroll")}`,
    });

    // use element to turn HTML string into elements
    let proxyElem = document.createElement("div");

    infScroll.on("load", function (body) {
      let records = body,
        recordPaginate = currentRecord * infScroll.loadCount,
        recordPaginateRange = recordPaginate + currentRecord,
        recordSlice = records.slice(recordPaginate, recordPaginateRange);

      if (recordSlice.length !== 0) {
        let records = recordSlice;

        var itemsHTML = records.map(getVideoPost).join("");

        proxyElem.innerHTML = itemsHTML;

        videosPosts.append(...proxyElem.children);
      } else {
        infScroll.destroy();
      }
    });

    function getVideoPost({ title, thumbnail, date_posted }) {
      return `
        <div class="col">
          <div class="text-secondary fs-8 lh-sm">
            <a href="videos-single.html" class="text-decoration-none text-secondary">
              <div class="video-thumbnail mb-3 ratio ratio-16x9">
                <img src="${thumbnail}" class="object-fit-cover img-fluid" alt="${title}" width="480" height="360" />
                <i class="bi bi-play-circle text-white position-absolute start-50 top-50 translate-middle d-flex justify-content-center align-items-center"></i>
              </div>
              <div class="d-flex justify-content-between">
                <div class="video-description-wrapper">
                  <div class="video-title">
                    <h2 class="fs-8 fw-bold">${title}</h2>
                  </div>
                  <div class="video-description-wrapper text-nowrap fs-4">
                    <div class="video-date">
                      <span>${date_posted}</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      `;
    }
  }

  // Infinite scroll gallery
  const galleryPosts = document.querySelector(".gallery-posts-container");

  if (galleryPosts) {
    let currentRecord = galleryPosts.children.length;

    let infScroll = new InfiniteScroll(galleryPosts, {
      path: function () {
        return `https://pvl.ph/gallery/loadmore`;
      },
      responseBody: "json",
      status: ".page-load-status",
      scrollThreshold: 0,
      history: false,
      fetchOptions: {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "group_no=287",
      },
    });

    // use element to turn HTML string into elements
    let proxyElem = document.createElement("div");

    infScroll.on("load", function (body) {
      let records = body,
        recordPaginate = currentRecord * infScroll.loadCount,
        recordPaginateRange = recordPaginate + currentRecord,
        recordSlice = records.slice(recordPaginate, recordPaginateRange);

      if (recordSlice.length !== 0) {
        let records = recordSlice;

        var itemsHTML = records.map(getGalleryPosts).join("");

        proxyElem.innerHTML = itemsHTML;

        galleryPosts.append(...proxyElem.children);
      } else {
        infScroll.destroy();
      }
    });

    function getGalleryPosts({ title, thumbnail, date_created }) {
      return `
      <div class="col">
        <div class="card text-white overflow-hidden">
          <a href="gallery-single.html" class="text-white">
            <div class="ratio ratio-4x3">
              <img
                src="${thumbnail}"
                class="card-img object-fit-cover img-fluid"
                alt="${title.replace(/_/g, " ")}"
                width="493"
                height="207"
              />
            </div>
            <div class="card-img-overlay bg-gradient row row-cols-1 align-items-end">
              <div class="col">
                <h2 class="card-title fs-6 fw-bold mb-0">${title.replace(/_/g, " ")}</h2>
                <span class="card-text fs-4 fw-bold">${date_created}</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    `;
    }
  }

  // Isotope Masonry
  const announcementPosts = document.querySelector(".announcement-grid");

  if (announcementPosts) {
    var iso = new Isotope(announcementPosts, {
      itemSelector: ".grid-item",
      getSortData: {
        number: "[data-timestamp]",
      },
      sortBy: "number",
      sortAscending: announcementPosts.getAttribute("data-ascending") == "true" ? true : false,
    });
  }
})();
