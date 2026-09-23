


// Obsługa menu mobilnego
const menuButton = document.querySelector(".menu-button");
const siteNav = document.querySelector(".site-nav");

if (menuButton && siteNav) {
    menuButton.addEventListener("click", () => {
        const isOpen = siteNav.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            siteNav.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });
}

// Obsługa jasnego i ciemnego motywu
const themeButton = document.querySelector(".theme-button");

function updateThemeIcon() {
    if (!themeButton) {
        return;
    }

    themeButton.querySelector("span").textContent =
        document.body.classList.contains("dark") ? "☀" : "☾";
}

const savedTheme = localStorage.getItem("raw-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
}

updateThemeIcon();

if (themeButton) {
    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        const theme = document.body.classList.contains("dark")
            ? "dark"
            : "light";

        localStorage.setItem("raw-theme", theme);
        updateThemeIcon();
    });
}

// Aktualizuje zegary
function updateClocks() {
    const now = new Date();

    const utcTime = document.getElementById("utc-time");
    const localTime = document.getElementById("local-time");
    const timezone = document.getElementById("timezone");

    if (utcTime) {
        utcTime.textContent =
            now.toISOString().slice(11, 19) + " UTC";
    }

    if (localTime) {
        localTime.textContent =
            now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });
    }

    if (timezone) {
        timezone.textContent =
            Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
}

function updateEventTimes() {
    const now = new Date();
    const utcDateParts = [
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate()
    ];

    document.querySelectorAll("[data-local-event-time]").forEach((element) => {
        const [hours, minutes] = element.dataset.localEventTime.split(":").map(Number);
        const eventDate = new Date(Date.UTC(...utcDateParts, hours, minutes));

        element.textContent = eventDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
    });
}

updateClocks();
updateEventTimes();
setInterval(() => {
    updateClocks();
    updateEventTimes();
}, 1000);

// Karta autora
const creatorButton = document.querySelector(".creator-button");
const creatorCard = document.getElementById("creator-card");
const creatorClose = document.querySelector(".creator-close");

function closeCreatorCard() {
    if (creatorCard) {
        creatorCard.classList.remove("open");
    }
}

if (creatorButton && creatorCard) {
    creatorButton.addEventListener("click", () => {
        creatorCard.classList.toggle("open");
    });
}

if (creatorClose) {
    creatorClose.addEventListener("click", closeCreatorCard);
}

document.addEventListener("click", (event) => {
    if (!creatorCard || !creatorButton) {
        return;
    }

    const clickedInsideCard = creatorCard.contains(event.target);
    const clickedButton = creatorButton.contains(event.target);

    if (!clickedInsideCard && !clickedButton) {
        closeCreatorCard();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeCreatorCard();

        if (siteNav && menuButton) {
            siteNav.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
        }
    }
});

