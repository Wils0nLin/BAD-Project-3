document.querySelector("#content-box").addEventListener("submit", async (event) => {
    event.preventDefault();

    // Restrict Volunteers Post the cat's birth date should older than today!!!
    const dateInput = document.querySelector("#age");
    const selectedDate = new Date(dateInput.value);
    const today = new Date();
    if (selectedDate >= today) {
        alert("Please select a date that is in the past.");
    } else {
        // submit the form to server
        const form = event.target;

        const formObject = new FormData(form);
        formObject.append("intro", intro.value);

        console.log(formObject);

        const res = await fetch("/volunteer_post_create", {
            method: "POST",
            body: formObject,
        });
        alert("Form submitted successfully!");
        const result = await res.json();

        window.location = "../volunteer_post.html";
    }
});
