const STORAGE_KEY =
  "bloom_birthday_guests_v1";

const TOTAL_SEATS = 120;

let guests =
  JSON.parse(
    localStorage.getItem(STORAGE_KEY)
  ) || [];



/* SHORTCUT */

const $ = id =>
  document.getElementById(id);



/* SAVE DATA */

function save() {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(guests)
  );

  renderDashboard();

}



/* CREATE CONFIRMATION CODE */

function makeCode() {

  let code;

  do {

    code =
      "BLOOM-" +
      Math.floor(
        1000 +
        Math.random() * 9000
      );

  }

  while (
    guests.some(
      guest =>
        guest.code === code
    )
  );

  return code;
}



/* ESCAPE HTML */

function escapeHtml(str) {

  return String(str).replace(
    /[&<>"']/g,

    character => {

      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      };

      return entities[character];

    }
  );

}



/* HOST DASHBOARD */

function renderDashboard(filter = "") {

  const filteredGuests =
    guests.filter(guest => {

      const searchText =
        `${guest.first}
        ${guest.last}
        ${guest.email}
        ${guest.code}`
          .toLowerCase();

      return searchText.includes(
        filter.toLowerCase()
      );

    });



  /* STATISTICS */

  $("registeredCount").textContent =
    guests.length;


  const checkedIn =
    guests.filter(
      guest =>
        guest.checkedIn
    ).length;


  $("checkedInCount").textContent =
    checkedIn;


  const seatsUsed =
    guests.reduce(
      (total, guest) =>
        total + guest.party,
      0
    );


  $("remainingCount").textContent =
    Math.max(
      0,
      TOTAL_SEATS - seatsUsed
    );


  $("attendanceRate").textContent =
    guests.length
      ? Math.round(
          (checkedIn / guests.length) *
          100
        ) + "%"
      : "0%";



  /* GUEST TABLE */

  $("guestTable").innerHTML =
    filteredGuests
      .map(
        guest => `

        <tr>

          <td>
            <strong>
              ${escapeHtml(
                guest.first
              )}
              ${escapeHtml(
                guest.last
              )}
            </strong>
          </td>


          <td>

            ${escapeHtml(
              guest.email
            )}

            <br>

            <small>
              ${escapeHtml(
                guest.phone
              )}
            </small>

          </td>


          <td>
            ${guest.party}
          </td>


          <td>
            <strong>
              ${guest.code}
            </strong>
          </td>


          <td>

            <span
              class="status
              ${guest.checkedIn
                ? "in"
                : "out"}"
            >

              ${
                guest.checkedIn
                  ? "Checked in"
                  : "Not arrived"
              }

            </span>

          </td>


          <td>

            <button
              class="check-action"
              onclick="
                toggleCheckin(
                  '${guest.code}'
                )
              "
            >

              ${
                guest.checkedIn
                  ? "Undo"
                  : "Check in"
              }

            </button>

          </td>

        </tr>

      `
      )
      .join("");


  $("emptyState").style.display =
    filteredGuests.length
      ? "none"
      : "block";

}



/* TOAST */

function showToast(message) {

  const toast =
    $("toast");

  toast.textContent =
    message;

  toast.classList.add(
    "show"
  );


  setTimeout(() => {

    toast.classList.remove(
      "show"
    );

  }, 2800);

}



/* REGISTRATION */

$("registrationForm")
  .addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const party =
        Number(
          $("guests").value
        );


      const seatsUsed =
        guests.reduce(
          (total, guest) =>
            total + guest.party,
          0
        );


      if (
        seatsUsed + party >
        TOTAL_SEATS
      ) {

        $("formMessage")
          .textContent =
          "Sorry, there aren't enough seats left for this party.";

        return;

      }



      const guest = {

        id: Date.now(),

        first:
          $("firstName")
            .value
            .trim(),

        last:
          $("lastName")
            .value
            .trim(),

        email:
          $("email")
            .value
            .trim(),

        phone:
          $("phone")
            .value
            .trim(),

        party,

        note:
          $("note")
            .value
            .trim(),

        updates:
          $("updates")
            .checked,

        code:
          makeCode(),

        checkedIn:
          false

      };


      guests.push(
        guest
      );


      save();


      $("formMessage")
        .textContent =
        `You're registered!
        Your confirmation code is
        ${guest.code}.`;


      $("registrationForm")
        .reset();


      showToast(
        `Welcome, ${guest.first}! RSVP confirmed.`
      );


      $("checkinCode")
        .value =
        guest.code;

    }
  );



/* CHECK-IN */

$("checkinBtn")
  .addEventListener(
    "click",
    () => {

      const code =
        $("checkinCode")
          .value
          .trim()
          .toUpperCase();


      const guest =
        guests.find(
          guest =>
            guest.code === code
        );


      if (!guest) {

        $("checkinResult")
          .textContent =
          "We couldn't find that code. Please check it and try again.";

        $("checkinResult")
          .style.color =
          "#a45c6f";

        return;

      }



      if (guest.checkedIn) {

        $("checkinResult")
          .textContent =
          `${guest.first} is already checked in. Welcome!`;

        $("checkinResult")
          .style.color =
          "#54744f";

        return;

      }



      guest.checkedIn = true;


      save();


      $("checkinResult")
        .textContent =
        `✓ ${guest.first}
        ${guest.last}
        is checked in.
        Enjoy the celebration!`;


      $("checkinResult")
        .style.color =
        "#54744f";


      showToast(
        "Guest checked in successfully."
      );

    }
  );



/* HOST CHECK-IN / UNDO */

window.toggleCheckin =
  function(code) {

    const guest =
      guests.find(
        guest =>
          guest.code === code
      );


    if (!guest) return;


    guest.checkedIn =
      !guest.checkedIn;


    save();


    showToast(

      guest.checkedIn
        ? `${guest.first} checked in.`
        : "Check-in undone."

    );

  };



/* OPEN HOST DASHBOARD */

$("hostToggle")
  .addEventListener(
    "click",
    () => {

      $("hostPanel")
        .classList
        .add("open");


      $("hostPanel")
        .scrollIntoView({
          behavior: "smooth"
        });

    }
  );



/* CLOSE HOST DASHBOARD */

$("closeHost")
  .addEventListener(
    "click",
    () => {

      $("hostPanel")
        .classList
        .remove("open");

    }
  );



/* SEARCH GUESTS */

$("guestSearch")
  .addEventListener(
    "input",
    event => {

      renderDashboard(
        event.target.value
      );

    }
  );



/* INITIAL LOAD */

renderDashboard();