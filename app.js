const API_URL = "https://script.google.com/macros/s/AKfycbz1IR_8B0IACajd6hvcwMa9u-cTl2Yz1O5-tmErhu0BuOHcmOJ1NFVJvs0cX9g32zwX/exec";

// 🔹 LOGIN + SEND DATA
async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    document.getElementById("msg").innerText =
      data.message || "Saved ✔";

  } catch (err) {
    console.error("Send error:", err);
    alert("Error sending data");
  }
}


// 🔹 REAL-TIME MESSAGE LOAD
async function loadMessage() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    document.getElementById("msg").innerText = data.message;

  } catch (err) {
    console.log("Load error");
  }
}


// 🔹 AUTO UPDATE (REAL-TIME FEEL)
window.onload = () => {
  loadMessage();
  setInterval(loadMessage, 2000); // 2 seconds safe realtime
};
