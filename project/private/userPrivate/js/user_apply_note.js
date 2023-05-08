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
  document.querySelector(
    "#form-location"
  ).innerHTML = ` <a href="user_apply_submit.html?id=${urlSearchParams.get(
    "id"
  )}"><input type="button" class="dark-button adopt-button" value="確定領養"/></a>`;
}
