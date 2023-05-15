window.onload = () => {
    loadCatCard();
};

async function loadCatCard() {
    const resp = await fetch("/public_cat");
    const cats = await resp.json();
    console.log(cats);
    let catAdoptHtml = "";
    document.querySelector("#adopt-box").innerHTML = "";
    for (const cat of cats) {
        catAdoptHtml += `
        <div class="u-align-left-xs u-container-style u-grey-70 u-list-item u-radius-15 u-repeater-item u-shape-round u-list-item-1" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500" data-href="volunteer_cat_info.html?id=${cat.id}">
            <div class="u-container-layout u-similar-container u-valign-top u-container-layout-1">
                <img 
                    class="u-border-7 u-border-grey-5 u-expanded-width u-image u-image-default u-image-1"
                    src="${cat.c_image}"
                    alt=""
                    data-image-width="1200"
                    data-image-height="1197"
                    data-animation-name="customAnimationIn"
                    data-animation-duration="1500"
                    data-animation-delay="500"
                />
                <h4 class="u-custom-font u-text u-text-2" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500"><i class="fa-solid fa-paw"></i> ${cat.c_name.slice(0, 6)}</h4>
                <p class="u-hidden-xs u-text u-text-3" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500">
                    性別：<span style="font-weight: 700">${cat.gender}</span>
                </p>
                <p class="u-hidden-xs u-text u-text-4" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500">
                    簡介：<span style="font-weight: 700">${cat.intro.slice(0, 6)}...</span>
                </p>
            </div>
        </div>
        `;
    }
    document.querySelector("#adopt-box").innerHTML = catAdoptHtml;
}
