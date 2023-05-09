// ---------- Login Part ----------//
const form = document.querySelector("#login-form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = form.u_username.value;
    const phone = form.u_phone_number.value;
    const email = form.u_email.value;
    
    // ---------- Login Info Submission ----------//
    const resp = await fetch("/public_user_forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, phone, email }),
    });

    if (resp.status === 200) {
        window.location = "/public_user_reset.html";
    } else {
        const data = await resp.json();
        alert(data.message);
    }
});
