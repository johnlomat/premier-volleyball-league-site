/**
 *  Sample format
 *  Date: August 10, 2023
 *  Date: August 10 2023
 *  Date: Aug 10, 2023
 *  Date: Aug 10 2023
 *  Date: 08-10-2023 (MM-DD-YYYY)
 *  Date with time: 08-10-2023 5:00 PM
 *  Date with time: 08-10-2023 16:00:00
 *  Date: 2023-08-10 (YYYY-MM-DD)
 *  Date with time: 2023-08-10 5:00 PM
 *  Date with time: 2023-08-10 16:00:00
 */

(() => {
  const getTimeRemaining = (endtime) => {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const initializeClock = (el, endtime) => {
    const clock = document.querySelector(el);
    const daysSpan = clock.querySelector(".days");
    const hoursSpan = clock.querySelector(".hours");
    const minutesSpan = clock.querySelector(".minutes");
    const secondsSpan = clock.querySelector(".seconds");
    const matchText = clock.querySelector(".match-team-text");
    const matchTeam = clock.querySelector(".match-team");
    const matchTimer = clock.querySelector(".match-timer");

    const updateClock = () => {
      const t = getTimeRemaining(endtime);

      daysSpan.innerHTML = (" " + t.days).slice(-2).replace(/(?![^<]*>)[^<]/g, (c) => `<span class="digit">${c}</span>\n`);
      hoursSpan.innerHTML = (" " + t.hours).slice(-2).replace(/(?![^<]*>)[^<]/g, (c) => `<span class="digit">${c}</span>\n`);
      minutesSpan.innerHTML = (" " + t.minutes).slice(-2).replace(/(?![^<]*>)[^<]/g, (c) => `<span class="digit">${c}</span>\n`);
      secondsSpan.innerHTML = (" " + t.seconds).slice(-2).replace(/(?![^<]*>)[^<]/g, (c) => `<span class="digit">${c}</span>\n`);

      if (t.total <= 0) {
        daysSpan.innerHTML = "00".slice(-2).replace(/(?![^<]*>)[^<]/g, (c) => `<span class="digit">${c}</span>\n`);
        hoursSpan.innerHTML = "00".slice(-2).replace(/(?![^<]*>)[^<]/g, (c) => `<span class="digit">${c}</span>\n`);
        minutesSpan.innerHTML = "00".slice(-2).replace(/(?![^<]*>)[^<]/g, (c) => `<span class="digit">${c}</span>\n`);
        secondsSpan.innerHTML = "00".slice(-2).replace(/(?![^<]*>)[^<]/g, (c) => `<span class="digit">${c}</span>\n`);
        matchText.innerHTML = `Live <span class="text-primary">Match</span>`;
        matchTeam.classList.remove("d-none");
        matchTeam.classList.add("d-block");
        matchTimer.classList.add("d-none");

        clearInterval(timeinterval);
      }
    };

    const timeinterval = setInterval(updateClock, 1000);
    updateClock();
  };

  var countdownClocks = document.querySelectorAll(".countdown-clock");

  if (countdownClocks) {
    countdownClocks.forEach((item) => {
      const deadline = item.dataset.deadline;

      initializeClock(".countdown-clock", deadline);
    });
  }
})();
