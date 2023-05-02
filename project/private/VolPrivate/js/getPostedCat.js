window.onload = () => {
  loadPostedCat();
};

async function loadPostedCat() {
  const resp = await fetch("/volPostedCat");
  const volPostedCat = await resp.json();

  let htmlStr = "";
  console.log(volPostedCat);
  if ("message" in volPostedCat) {
    htmlStr += '<P style="style="font-size: 100;"">YOU ARE NOT VOLUNTEER</p>';

    document.querySelector("#adopt-box").innerHTML = htmlStr;
  } else {
    for (let post of volPostedCat) {
      htmlStr += `
            <div class="cat-card" id="card-${post.id}" style="height: 420px">
                <a href="vol_editAdoptCase.html?caseID=${post.id}"><img src="${post.c_image}" width="200px" class="cat-image"></a>
                <a href="vol_editAdoptCase.html?caseID=${post.id}"><div style="color: #ffffff;">
                    <div class="cat-name"><i class="fa-solid fa-paw"></i>${(post.c_name).slice(0,6)}</div>
                    <div class="cat-gender card-text">性別：${post.gender}</div>
                    <div class="cat-intro card-text">簡介：${(post.intro).slice(0,6)}...</div>
                </div></a>
                <div style="display: flex; justify-content: end">
                    <div><a href="vol_editAdoptCasePage.html?caseID=${post.id}"><i class="fa-solid fa-pen"></i></a></div>
                    <div class="delete"><i class="fa-solid fa-trash-can" data-mid="card-${post.id}"></i></div>
                </div></div>
            `;
      document.querySelector("#adopt-box").innerHTML = htmlStr;
    }
  }

  // ------------ Delete Cat Info function --------------//
  const elements = document.querySelectorAll(".cat-card .fa-trash-can");

  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function (e) {
      const btn = e.target;
      const mid = btn.dataset.mid;
      Swal.fire({
        title: "Are you sure?",
        text: "資料將被刪除!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, 請刪除!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "資料已被刪除.", "success");
          const id = mid.split("-")[1];
          const content = document.querySelector(`#${mid}`).textContent.trim();
          // console.log(content);
          const resp = await fetch(`/volPostedCat/${id}`, {
            method: "DELETE",
          });
        }

        if (resp.status === 200) {
          window.location = `/vol_postAdoptCase.html`;
        }
      });
    });
  }
}
