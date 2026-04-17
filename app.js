const API_URL = "https://script.google.com/macros/s/AKfycbzNbgmhyjWxB88xfq0RLfrprlUZVICEGZwxTOFiQvX60mlW9oZRwmfU_wO6pH2LOBN6/exec";


// 🔹 LOGIN FUNCTION
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

    // ⚠️ safer response handling
    const text = await res.text();
    const data = JSON.parse(text);

    document.getElementById("msg").innerText =
      data.message || "Saved successfully ✔";

  } catch (err) {
    console.error("Login error:", err);
    alert("Error sending data");
  }
}


// 🔹 LOAD MESSAGE (REAL-TIME)
async function loadMessage() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    document.getElementById("msg").innerText = data.message;

  } catch (err) {
    console.log("Message load error");
  }
}


// 🔹 START AUTO UPDATE
window.onload = () => {
  loadMessage();
  setInterval(loadMessage, 2000); // ⚡ 2 sec real-time update
};
