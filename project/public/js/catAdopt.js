window.onload = () => {
  loadCatCard();
};

// Load Volunteers post function
async function loadCatCard() {
  const resp = await fetch("/catAdoptData");
  const cats = await resp.json();
  console.log(cats);
  let catAdoptHtml = "";
  document.querySelector("#adopt-box").innerHTML = "";
  for (const cat of cats) {
      catAdoptHtml += `
      <a href="public_catProfile.html?id=${cat.id}"><div class="cat-card">
          <img src="${cat.c_image}" class="cat-image">
          <div>
              <div class="cat-name"><i class="fa-solid fa-paw"></i>${(cat.c_name).slice(0,6)}</div>
              <div class="card-text">性別：${cat.gender}</div>
              <div class="card-text">簡介：${(cat.intro).slice(0,6)}...</div>
          </div>
      </div></a>
      `;
  }
  document.querySelector("#adopt-box").innerHTML = catAdoptHtml;
}