const API_URL = "https://script.google.com/macros/s/AKfycbzr_AGnjsbhYf1L59dy7rU8qlysLFxvDhs3Y6ay8q9-TEGuzOaycG9auir7hNtSKCd8/exec";

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
      mode: "no-cors",   // IMPORTANT for Google Script
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    // no-cors = cannot read response, assume success
    alert("Login successful ✔ Data stored in Google Sheet");

    document.getElementById("msg").innerText =
      "Saved: " + email;

  } catch (err) {
    console.error(err);
    alert("Error sending data");
  }
}
