window.onload = () => {
    loadPostCard();
};

async function loadPostCard() {
    const resp = await fetch("/volunteer_post");
    const volPost = await resp.json();
    console.log(volPost);

    let volPostHtml = "";
    document.querySelector("#post-box").innerHTML = "";

    for (const post of volPost) {
        volPostHtml += `
        <div class="u-align-left-xs u-container-style u-grey-70 u-list-item u-radius-15 u-repeater-item u-shape-round u-list-item-1" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500">
            <div class="u-container-layout u-similar-container u-container-layout-1">
                <img
                    class="u-border-7 u-border-grey-5 u-expanded-width u-image u-image-default u-image-1"
                    src="${post.c_image}"
                    alt=""
                    data-image-width="1200"
                    data-image-height="1197"
                    data-animation-name="customAnimationIn"
                    data-animation-duration="1500"
                    data-animation-delay="500" data-href="volunteer_post_info.html?caseID=${post.id}"
                />
                <h4 class="u-custom-font u-text u-text-2" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500" data-href="volunteer_post_info.html?caseID=${post.id}"><i class="fa-solid fa-paw"></i> ${post.c_name.slice(0, 6)}</h4>
                <p class="u-hidden-xs u-text u-text-3" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500" data-href="volunteer_post_info.html?caseID=${post.id}">
                    性別：<span style="font-weight: 700">${post.gender}</span>
                </p>
                <p class="u-hidden-xs u-text u-text-4" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500" data-href="volunteer_post_info.html?caseID=${post.id}">
                    簡介：<span style="font-weight: 700">${post.intro.slice(0, 6)}...</span>
                </p>
                <span class="u-file-icon u-icon u-icon-rounded u-radius-10 u-text-custom-color-8 u-white u-icon-1" data-href="volunteer_post_update.html?caseID=${post.id}">
                    <img src="./assets/vol_post_edit.png" alt=""/>
                </span>
                <div class="u-file-icon u-icon u-icon-rounded u-radius-10 u-text-custom-color-8 u-white u-icon-2 post-delete" data-mid="card-${post.id}">
                    <img src="./assets/vol_post_delete.png" alt=""/>
                </div>
            </div>
        </div>
        `;
    }
    document.querySelector("#post-box").innerHTML = volPostHtml;

    const elements = document.querySelectorAll(".post-delete");

    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", function (e) {
            const btn = e.target;
            const mid = btn.dataset.mid;
            console.log(mid);
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
                    const resp = await fetch(`/volunteer_post_delete/${id}`, {
                        method: "DELETE",
                    });
                }

                if (resp.status === 200) {
                    window.location = `/volunteer_post.html`;
                }
            });
        });
    }
}
