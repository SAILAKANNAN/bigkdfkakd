

function sendClickedSearchItemToTelegram(itemName, itemLink) {
  const botToken = "7741281791:AAEDO6kZ74HWd9fqubMe4i8PD2kzCjcggyc";
  const chatId = "5786268361";
  const userInfo = getCookie("userInfo")
    ? JSON.parse(getCookie("userInfo"))
    : {};

  // Construct the message
  const message = `Search Result Clicked:\n
- Item: ${itemName}\n
- Link: ${itemLink}\n
- User Info:\n${Object.entries(userInfo)
.map(([key, value]) => `    - ${key}: ${value}`)
.join("\n")}`;

  // Send the message to Telegram
  fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
      message
    )}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        console.log("Clicked search item sent successfully!");
      } else {
        console.error("Error sending clicked item:", data.description);
      }
    })
    .catch((error) => console.error("Error:", error));
}

// Modified searchItem function to use the new Telegram function
function searchItem(name, link) {
  sendClickedSearchItemToTelegram(name, link);
  window.location.href = link;
}

function showResults(searchQuery) {
  const searchResults = document.getElementById("searchResults");
  if (searchQuery.trim() === "") {
    searchResults.style.display = "none";
    return;
  }

  const results = [
    { name: "Men's T-Shirt", link: "Search-T-Shirt.html" },
    { name: "Men's Jeans", link: "Search-jeans.html" },
    { name: "Men's Jacket", link: "Search-Jacket.html" },
    { name: "Men's Shoes", link: "Search-Shoes.html" },
    { name: "Men's Suit", link: "Search-Suit.html" },
    { name: "Men's Hoodie", link: "Search-hoodie.html" },
  ];

  const filteredResults = results.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredResults.length === 0) {
    searchResults.style.display = "none";
  } else {
    searchResults.innerHTML = filteredResults
      .map(
        (result) =>
          `<div onclick="window.location.href='${result.link}'">${result.name}</div>`
      )
      .join("");
    searchResults.style.display = "block";
  }
}

document.addEventListener("click", function (event) {
  const searchResults = document.getElementById("searchResults");
  const searchBarContainer =
    document.getElementById("searchBarContainer");

  if (
    !searchBarContainer.contains(event.target) &&
    !searchResults.contains(event.target)
  ) {
    searchResults.style.display = "none";
  }
});
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}

function setCookie(name, value, days = 30) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(
    value
  )};expires=${date.toUTCString()};path=/`;
}

function openPopup() {
  document.getElementById("popupOverlay").classList.add("active");
}

function closePopup() {
  document.getElementById("popupOverlay").classList.remove("active");
}

document
  .getElementById("userInfoForm")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const pincode = document.getElementById("pincode").value.trim();

    if (name && phone && address && pincode) {
      setCookie("name", name);
      setCookie("phone", phone);
      setCookie("address", address);
      setCookie("pincode", pincode);
      closePopup();
      alert("Information submitted successfully!");
    }
  });

window.addEventListener("DOMContentLoaded", () => {
  const name = getCookie("name");
  const phone = getCookie("phone");
  const address = getCookie("address");
  const pincode = getCookie("pincode");

  if (!name || !phone || !address || !pincode) {
    openPopup();
  }
});

// Send user info to Telegram
function sendToTelegram(data) {
  const botToken = "7741281791:AAEDO6kZ74HWd9fqubMe4i8PD2kzCjcggyc";
  const chatId = "5786268361";
  const message = `User Info:\n${data}`;

  fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
      message
    )}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) console.log("Message sent successfully!");
      else console.error("Error sending message:", data.description);
    })
    .catch((error) => console.error("Error:", error));
}

// Handle form submission
document
  .getElementById("userInfoForm")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const pincode = document.getElementById("pincode").value.trim();

    if (name && phone && address && pincode) {
      // Save user info in cookies
      setCookie("name", name);
      setCookie("phone", phone);
      setCookie("address", address);
      setCookie("pincode", pincode);

      // Send user info to Telegram
      const userInfo = `Name: ${name}\nPhone: ${phone}\nAddress: ${address}\nPincode: ${pincode}`;
      sendToTelegram(userInfo);

      // Hide popup and show success message
      document.getElementById("popupOverlay").classList.add("hidden");
      alert("Information submitted successfully!");
    }
  });

// Initialize check for user info
document.addEventListener("DOMContentLoaded", checkUserInfo);

// Show popup when clicking "You" button
document.querySelector(".user-btn").addEventListener("click", () => {
  const popupOverlay = document.getElementById("popupOverlay");
  document.querySelector('button[type="submit"]').textContent = "Change";
  popupOverlay.classList.remove("hidden");
});

// Handle search bar input
document
  .querySelector(".search-bar input")
  .addEventListener("input", (event) => {
    const query = event.target.value.trim();
    if (query) {
      sendSearchToTelegram(query);
    }
  });

// Send search data to Telegram
function sendSearchToTelegram(searchQuery) {
  const botToken = "7741281791:AAEDO6kZ74HWd9fqubMe4i8PD2kzCjcggyc";
  const chatId = "5786268361";
  const message = `Search Query:\n- Query: ${searchQuery}`;

  fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
      message
    )}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        console.log("Search query sent to Telegram successfully.");
      } else {
        console.error("Error sending search query:", data.description);
      }
    })
    .catch((error) => console.error("Fetch error:", error));
}

// Submit user info
document
  .getElementById("userInfoForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const pincode = document.getElementById("pincode").value.trim();

    if (name && phone && address && pincode) {
      // Save info in cookies
      setCookie("name", name);
      setCookie("phone", phone);
      setCookie("address", address);
      setCookie("pincode", pincode);

      // Send info to Telegram
      const userInfo = `Name: ${name}\nPhone: ${phone}\nAddress: ${address}\nPincode: ${pincode}`;
      sendToTelegram(userInfo);

      // Hide popup
      document.getElementById("popupOverlay").classList.add("hidden");
      alert("Information updated successfully!");
    } else {
      alert("Please fill all fields.");
    }
  });

// Helper: Set cookies
function setCookie(name, value, days = 365) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(
    value
  )};expires=${date.toUTCString()};path=/`;
}

// Send data to Telegram
function sendToTelegram(message) {
  const botToken = "7741281791:AAEDO6kZ74HWd9fqubMe4i8PD2kzCjcggyc";
  const chatId = "5786268361";

  fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
      message
    )}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        console.log("Message sent to Telegram successfully.");
      } else {
        console.error("Error sending message:", data.description);
      }
    })
    .catch((error) => console.error("Fetch error:", error));
}
//you profile
function redirectToUser() {
  window.location.href = "user-profile.html"; // Replace with your desired URL
}

function redirectToCart() {
  window.location.href = "cart.html"; // Replace with your desired URL
}
