const PASSWORD = "love";

function unlock() {
  const input = document.getElementById("passwordInput").value;
  if (input === PASSWORD) {
    document.getElementById("lockScreen").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    showProfile();
  } else {
    document.getElementById("errorMsg").textContent =
      "😫 Wrong password. Try again.";
  }
}

function showProfile() {
  const p = profiles[currentProfile];
  document.getElementById("profileDisplay").innerHTML = `
                <h2>${p.name}</h2>
                <p>${p.bio}</p>
                <p>❤️ ${p.likes} likes</p>
                <button onclick="like()">Like ❤️</button>
            `;
}

function nextProfile() {
  currentProfile = (currentProfile + 1) % profiles.length;
  showProfile();
}

function prevProfile() {
  currentProfile = (currentProfile - 1 + profiles.length) % profiles.length;
  showProfile();
}

function like() {
  profiles[currentProfile].likes++;
  showProfile();
}

(function () {
  // ---------- DATABASE (mock) ----------
  const people = [
    {
      name: "Markky",
      age: 23,
      city: "Offa",
      img: "./images/markyy.jpg",
      bio: "Tech & Watching Movies",
      phone: +2348068736505,
    },
    {
      name: "Rasaq",
      age: 24,
      city: "Offa",
      img: "./images/baron.jpg",
      bio: "Playing Football & Singing",
      phone: +2348101539244,
    },
    {
      name: "Sekeenah",
      age: 20,
      city: "Offa",
      img: "./images/sekeenah.jpg",
      bio: "Dancing & Singing",
      phone: +2349011341939,
    },
    {
      name: "Mariam",
      age: 22,
      city: "Offa",
      img: "./images/mariam.jpg",
      bio: "Sleeping",
      phone: +2349161075262,
    },
    {
      name: "Sherif",
      age: 24,
      city: "Offa",
      img: "./images/sherif.jpg",
      bio: "Reading & Playing video games",
      phone: +2347043846346,
    },
    {
      name: "Bidemi",
      age: 23,
      city: "Offa",
      img: "./images/bidemi.jpg",
      bio: "Kpop, Sleeping and Gisting",
      phone: +2349039037162,
    },
    {
      name: "Feranmi",
      age: 23,
      city: "Ijagbo",
      img: "./images/feranmi.jpg",
      bio: "Dancing & Singing ",
      phone: +2347039535695,
    },
    {
      name: "Eyitayo",
      age: 24,
      city: "Offa",
      img: "./images/eyitayo.jpg",
      bio: "Seeking Knowledge 🍷📚",
      phone: +2349060757967,
    },
    {
      name: "Aminat",
      age: 24,
      city: "Offa",
      img: "./images/aminat.jpg",
      bio: "Reading & Sleeping",
      phone: +234,
    },
    {
      name: "Likma",
      age: 21,
      city: "Offa",
      img: "./images/abdul.jpg",
      bio: "Playing Football & Watching Football",
      phone: +2349026822053,
    },
  ];

  // DOM elements
  const profileImg = document.getElementById("profileImg");
  const profileName = document.getElementById("profileName");
  const profileBio = document.getElementById("profileBio");
  const likeBtn = document.getElementById("likeBtn");
  const messageBtn = document.getElementById("messageBtn");
  const nextBtn = document.getElementById("nextProfileBtn");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const ageFilter = document.getElementById("ageFilter");
  const cityFilter = document.getElementById("cityFilter");
  const peopleGrid = document.getElementById("peopleGrid");

  // current profile index
  let currentIndex = 0; // start with Alexa

  // render grid (all people)
  function renderGrid(filteredArray = null) {
    const data = filteredArray || people;
    peopleGrid.innerHTML = "";
    if (data.length === 0) {
      peopleGrid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:2rem; color:#8a7a7a;">No matches found. <i class="fas fa-smile"></i></div>`;
      return;
    }
    data.forEach((person, idx) => {
      const card = document.createElement("div");
      card.className = "person-card";
      card.innerHTML = `
          <img src="${person.img}" alt="${person.name}" onerror="this.src='./images/user.jpg'">
          <h4>${person.name}, ${person.age}</h4>
          <p>📍 ${person.city}</p>
          <div class="card-actions">
            <i class="fas fa-phone" data-idx="${idx}"></i>
          </div>
        `;
      // quick like / message from grid (demo)
      card.querySelector(".fa-phone").addEventListener("click", (e) => {
        e.stopPropagation();
        window.location.href = `tel:${person.phone}`;
      });
      // click card to set as main profile
      card.addEventListener("click", () => {
        setMainProfile(idx, data);
      });
      peopleGrid.appendChild(card);
    });
  }

  // set main profile (from people array using index)
  function setMainProfile(index, dataArr = people) {
    if (!dataArr[index]) return;
    const p = dataArr[index];
    currentIndex = people.indexOf(p); // keep track in global array
    profileImg.src = p.img;
    profileName.textContent = `${p.name}, ${p.age}`;
    profileBio.textContent = p.bio || "No bio yet.";
    // update featured card tagline (city)
    const tagline = document.querySelector(".profile-info .tagline");
    tagline.innerHTML = `<span>📍 ${p.city}</span><span>❤️ ${p.age} yo</span>`;
  }

  // filter logic
  function filterPeople() {
    const query = searchInput.value.trim().toLowerCase();
    const ageVal = ageFilter.value;
    const cityVal = cityFilter.value.toLowerCase();

    let filtered = people.filter((person) => {
      // city filter
      if (cityVal !== "all" && !person.city.toLowerCase().includes(cityVal))
        return false;
      // age filter
      if (ageVal !== "all") {
        if (ageVal === "18-21" && (person.age < 18 || person.age > 30))
          return false;
        if (ageVal === "21-25" && (person.age < 21 || person.age > 40))
          return false;
        if (ageVal === "25+" && person.age < 25) return false;
      }
      // text search (name or city)
      if (
        query &&
        !person.name.toLowerCase().includes(query) &&
        !person.city.toLowerCase().includes(query)
      )
        return false;
      return true;
    });
    renderGrid(filtered);
    if (filtered.length > 0) setMainProfile(0, filtered);
    else {
      // reset main to first if filtered empty (but show empty grid)
      if (people.length > 0) setMainProfile(0, people);
    }
  }

  // like button action
  likeBtn.addEventListener("click", () => {
    const phone = person.phone.replace(/\D/g, "");
    const message = encodeURIComponent(
      `Hi ${person.name}! I liked you on HeartSync`,
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  });

  // next profile (cycle through main people array)
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % people.length;
    setMainProfile(currentIndex);
    // highlight in grid? optional
  });

  // search & filter events
  searchBtn.addEventListener("click", filterPeople);
  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") filterPeople();
  });
  ageFilter.addEventListener("change", filterPeople);
  cityFilter.addEventListener("change", filterPeople);

  // initial render
  renderGrid();
  // set main to first (Alexa)
  setMainProfile(0);

  // also reset if needed
  window.filterPeople = filterPeople; // for console
})();
