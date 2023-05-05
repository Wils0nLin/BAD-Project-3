// ---------- Login Part ----------//
const form = document.querySelector("#login-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = form.username.value;
  const password = form.password.value;
  console.log(username);
  console.log(password);

  // ---------- Login Info Submission ----------//
  const resp = await fetch("/public_volunteer_login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (resp.status === 200) {
    window.location = "/vol_index.html";
  } else {
    const data = await resp.json();
    alert(data.message);
  }
});
