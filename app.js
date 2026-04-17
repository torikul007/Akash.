const API_URL = "https://script.google.com/macros/s/AKfycbzT7uISsv4-oZ8eKRmINKCDlhtxLSPGPSGYAhqaMVVj7qOpNMDUZ6zozqo6dWyiNJP1/exec";

// 🔹 LOGIN FUNCTION (unchanged behavior + message support)
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
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await res.json(); // ✅ read response

    alert("Login successful ✔ Data stored in Google Sheet");

    document.getElementById("msg").innerText =
      data.message || ("Saved: " + email);

  } catch (err) {
    console.error(err);
    alert("Error sending data");
  }
}


// 🔹 LOAD MESSAGE FROM GOOGLE SHEET
async function loadMessage() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    document.getElementById("msg").innerText = data.message;
  } catch (err) {
    console.log("Error loading message");
  }
}


// 🔹 AUTO LOAD + REAL-TIME UPDATE
window.onload = () => {
  loadMessage(); // first load

  // 🔁 refresh every 5 seconds
  setInterval(loadMessage, 5000);
};
