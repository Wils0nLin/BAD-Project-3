// ---------- Login Part ----------//
const form = document.querySelector("#login-form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = form.u_username.value;
    const phone = form.u_phone_number.value;
    const email = form.u_email.value;
    console.log(username);
    console.log(phone);
    console.log(email);

    // ---------- Login Info Submission ----------//
    const resp = await fetch("/userLoginRoute/userOtherLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, phone, email }),
    });

    if (resp.status === 200) {
        window.location = "/user_index.html";
    } else {
        const data = await resp.json();
        alert(data.message);
    }
});
