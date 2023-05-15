window.onload = async () => {
    loadCatIndividualData();
};

async function loadCatIndividualData() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    if (!urlSearchParams.has("id")) {
        window.location = "/";
        return;
    }
    console.log(urlSearchParams.get("id"));
    document.querySelector("#form-location").innerHTML = ` 
    <a href="user_apply_submit.html?id=${urlSearchParams.get(
        "id"
    )}" class="u-active-palette-3-light-1 u-border-none u-btn u-btn-round u-button-style u-custom-color-13 u-hover-palette-3-light-1 u-radius-6 u-text-active-custom-color-2 u-text-hover-custom-color-2 u-btn-1">確定領養</a>`;
}
