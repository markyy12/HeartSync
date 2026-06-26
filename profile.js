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
      name: "Rasaq",
      age: 23,
      city: "Kwara",
      img: "./images/baron.jpg",
      bio: "Playing Football & Singing",
      phone: +2348101539244,
    },
    {
      name: "Sekeenah",
      age: 20,
      city: "Kwara",
      img: "./images/sekeenah.jpg",
      bio: "Dancing & Singing",
      phone: +2349011341939,
    },
    {
      name: "Mariam",
      age: 22,
      city: "Kwara",
      img: "./images/mariam.jpg",
      bio: "Sleeping",
      phone: +2349161075262,
    },
    {
      name: "Sherif",
      age: 24,
      city: "Kwara",
      img: "./images/sherif.jpg",
      bio: "Reading & Playing video games",
      phone: +2347043846346,
    },
    {
      name: "Bidemi",
      age: 23,
      city: "Kwara",
      img: "./images/bidemi.jpg",
      bio: "Kpop, Sleeping and Gisting",
      phone: +2349039037162,
    },
    {
      name: "Peter",
      age: 20,
      city: "Kwara",
      img: "./images/peter.jpeg",
      bio: "Software engineer, Founder, SendlyAI, Clipforge & Faultline",
      phone: +2348113950481,
    },
    {
      name: "Aishat",
      age: 23,
      city: "Kwara",
      img: "./images/aishat.jpg",
      bio: "",
      phone: +2347058793905,
    },
    {
      name: "Abdulazeez",
      age: 23,
      city: "Ibadan",
      img: "./images/alimi.jpeg",
      bio: "Tech & Learning new things ",
      phone: +2349151369309,
    },
    {
      name: "Tobi",
      age: 23,
      city: "Kwara",
      img: "./images/adeniyi.jpeg",
      bio: "Seeking Knowledge 📚",
      phone: +2348147621273,
    },
    {
      name: "Likma",
      age: 21,
      city: "Kwara",
      img: "./images/abdul.jpg",
      bio: "Playing Football & Watching Football",
      phone: +2349026822053,
    },
    {
      name: "Khadijah",
      age: 24,
      city: "Kwara",
      img: "./images/khadijah.jpg",
      bio: "Baking & Content creation",
      phone: +2349059382023,
    },
    {
      name: "Damilola",
      age: 22,
      city: "Kwara",
      img: "./images/damilola.jpg",
      bio: "Exploring opportunities & Learnin new things",
      phone: +2349134285390,
    },
    {
      name: "Abdulwareez",
      age: 22,
      city: "Kwara",
      img: "./images/user.jpg",
      bio: "",
      phone: +2348146770439,
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

  // helper: build a clean WhatsApp link for a given person + message
  function buildWhatsAppLink(person, message) {
    const phoneDigits = String(person.phone).replace(/\D/g, "");
    return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;
  }

  // like button action -> opens current person's WhatsApp with a "liked you" message
   likeBtn.addEventListener("click", () => {
    const person = people[currentIndex];
    if (!person) return;
    const link = buildWhatsAppLink(
      person,
      `Hi ${person.name}! I liked you on HeartSync 💕`,
    );
    window.open(link, "_blank");
  });

  // message button action -> opens current person's WhatsApp with a friendly intro message
  messageBtn.addEventListener("click", () => {
    const person = people[currentIndex];
    if (!person) return;
    const link = buildWhatsAppLink(
      person,
      `Hi ${person.name}! I'd love to chat with you on HeartSync 😊`,
    );
    window.open(link, "_blank");
  });

  likeBtn.parentNode.removeAttribute("href"); // Disarm previous WhatsApp redirect wrapping anchor paths
  messageBtn.parentNode.removeAttribute("href"); // Disarm previous WhatsApp redirect wrapping anchor paths

  // Updated Like button interaction model
  likeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // Assuming 'Markky' acts as your current session owner user profile identifier context
    window.location.href = `chat.html?user=Rasaq&match=${encodeURIComponent(p.name)}`;
  });

  // Updated Message button interaction model
  messageBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = `chat.html?user=Rasaq&match=${encodeURIComponent(p.name)}`;
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

  // ---------- LIGHTBOX ----------
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxName = document.getElementById("lightbox-name");
  const lightboxClose = document.getElementById("lightbox-close");

  function openLightbox(src, name) {
    lightboxImg.src = src;
    lightboxName.textContent = name || "";
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  // close on X button or clicking outside the image
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  // main profile avatar click
  document.getElementById("profileImg").addEventListener("click", function () {
    const name = document.getElementById("profileName").textContent;
    openLightbox(this.src, name);
  });

  // grid card images — delegate from peopleGrid (works after re-renders)
  document.getElementById("peopleGrid").addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if (!img) return;
    const card = img.closest(".person-card");
    const name = card ? card.querySelector("h4")?.textContent : "";
    openLightbox(img.src, name);
  });
})();
