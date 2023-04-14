// ---------- Login Part ----------//
const form = document.querySelector("#login-form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = form.username.value;
    const password = form.password.value;

    // ---------- Login Info Submission ----------//
    const resp = await fetch("/volunteerlogin", {
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
