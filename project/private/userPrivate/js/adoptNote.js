window.onload = async () => {
    loadCatIndividualData();
};

async function loadCatIndividualData() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    if (!urlSearchParams.has("id")) {
        window.location = "/";
        return;
    }
    document.querySelector(
        "#form-location"
    ).innerHTML = ` <a href="user_adoptForm.html?id=${urlSearchParams.get(
        "id"
    )}"><input type="button" class="dark-button adopt-button" value="確定領養"/></a>`;
}
