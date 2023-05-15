window.onload = () => {
    adoptCaseData();
};

async function adoptCaseData() {
    const sResp = await fetch("/user_apply");
    const adoptStatus = await sResp.json();
    console.log(adoptStatus);
    let catAdoptHtml = "";
    document.querySelector("#apply-box").innerHTML = "";

    if (adoptStatus.length == 0) {
        catAdoptHtml += `
        <div id="empty-card">
            <div class="cat-pic"><i class="fa-solid fa-paw"></i></div>
            <div id="empty-text">
                <div>你尚未提出申請領養</div>
                <div>去看看有哪些貓貓正等待着你吧</div>
                <li class="nav-button" id="empty-button">
                    <a href="user_cat_adopt.html">
                        <div class="cat-logo"><i class="fa-solid fa-paw"></i></div>
                        待領養貓貓
                        <div class="cat-logo cat-logo-right"><i class="fa-solid fa-paw"></i></div>
                    </a>
                </li>
            </div>
            <div class="cat-pic"><i class="fa-solid fa-paw"></i></div>
        </div>
        `;
        document.querySelector("#adopt-box").innerHTML = catAdoptHtml;
    } else {
        for (let myAdopt of adoptStatus) {
            if (myAdopt.adopt_status == "pending") {
                catAdoptHtml += `
                <div class="u-align-center u-container-style u-grey-70 u-list-item u-radius-20 u-repeater-item u-shape-round u-list-item-1">
                    <div class="u-container-layout u-similar-container u-container-layout-1">
                        <img
                            class="u-border-7 u-border-grey-5 u-image u-image-default u-image-1"
                            src="${myAdopt.img}"
                            alt=""
                            data-image-width="735"
                            data-image-height="980"
                        />
                        <h4 class="u-align-left u-text u-text-white u-text-2"><i class="fa-solid fa-paw"></i> ${myAdopt.cat_name}</h4>
                        <p class="u-align-left u-text u-text-3">你的申請已遞交，正在審核</p>
                    </div>
                </div>
                `;
            } else if (myAdopt.adopt_status == "REJECT") {
                catAdoptHtml += `
                <div class="u-align-center u-container-style u-grey-70 u-list-item u-radius-20 u-repeater-item u-shape-round u-list-item-1">
                    <div class="u-container-layout u-similar-container u-container-layout-1">
                        <img
                            class="u-border-7 u-border-grey-5 u-image u-image-default u-image-1"
                            src="${myAdopt.img}"
                            alt=""
                            data-image-width="735"
                            data-image-height="980"
                        />
                        <h4 class="u-align-left u-text u-text-white u-text-2"><i class="fa-solid fa-paw"></i> ${myAdopt.cat_name}</h4>
                        <p class="u-align-left u-text u-text-3">你的申請已被拒絕</p>
                    </div>
                </div>
                `;
            } else if (myAdopt.adopt_status == "ACCEPT") {
                catAdoptHtml += `
                <div class="u-align-center u-container-style u-grey-70 u-list-item u-radius-20 u-repeater-item u-shape-round u-list-item-1" data-href="user_apply_info.html?caseID=${myAdopt.form_id}">
                    <div class="u-container-layout u-similar-container u-container-layout-1">
                        <img
                            class="u-border-7 u-border-grey-5 u-image u-image-default u-image-1"
                            src="${myAdopt.img}"
                            alt=""
                            data-image-width="735"
                            data-image-height="980"
                        />
                        <h4 class="u-align-left u-text u-text-white u-text-2"><i class="fa-solid fa-paw"></i> ${myAdopt.cat_name}</h4>
                        <p class="u-align-left u-text u-text-3">義工已初步接受申請，請點擊查看詳情</p>
                    </div>
                </div>
                `;
            }
        }
    }
    document.querySelector("#apply-box").innerHTML = catAdoptHtml;
}
