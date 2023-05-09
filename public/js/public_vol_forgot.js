// ---------- Login Part ----------//
const form = document.querySelector("#login-form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = form.v_username.value;
    const phone = form.v_phone_number.value;
    const email = form.v_email.value;
    
    // ---------- Login Info Submission ----------//
    const resp = await fetch("/public_volunteer_forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, phone, email }),
    });

    if (resp.status === 200) {
        window.location = "/volunteer_password_reset.html";
    } else {
        const data = await resp.json();
        alert(data.message);
    }
});
