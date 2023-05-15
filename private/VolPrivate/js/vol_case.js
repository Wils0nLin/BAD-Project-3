window.onload = () => {
    adoptCaseData();
};

async function adoptCaseData() {
    const sResp = await fetch("/volunteer_case");
    const adoptStatus = await sResp.json();

    let volCaseHtml = "";
    document.querySelector("#case-box").innerHTML = "";

    if (adoptStatus.length == 0) {
        volCaseHtml += `
        <div class="u-align-center u-container-style u-grey-70 u-list-item u-radius-20 u-repeater-item u-shape-round u-list-item-1" data-href="volunteer_post_create.html">
            <div class="u-container-layout u-similar-container u-container-layout-1">
                <h4 class="u-align-left u-text u-text-white u-text-2">你尚未收到領養申請</h4>
                <p class="u-align-left u-text u-text-3">去發佈新的貓貓讓更多人認識牠吧</p>
            </div>
        </div>
        `;

        document.querySelector("#case-box").innerHTML = volCaseHtml;
    } else {
        for (let myAdopt of adoptStatus) {
            if (myAdopt.adopt_status == "pending") {
                volCaseHtml += `
                <div class="u-align-center u-container-style u-grey-70 u-list-item u-radius-20 u-repeater-item u-shape-round u-list-item-1" data-href="volunteer_case_info.html?caseID=${myAdopt.form_id}">
                    <div class="u-container-layout u-similar-container u-container-layout-1">
                        <img class="u-border-7 u-border-grey-5 u-image u-image-default u-image-1" src="${myAdopt.img}" alt="" data-image-width="735" data-image-height="980"/>
                        <h4 class="u-align-left u-text u-text-white u-text-2"><i class="fa-solid fa-paw"></i> ${myAdopt.cat_name}</h4>
                        <p class="u-align-left u-text u-text-3">已收到領養申請，請審核</p>
                    </div>
                </div>
                `;
            } else if (myAdopt.adopt_status == "ACCEPT") {
                volCaseHtml += `
                <div class="u-align-center u-container-style u-grey-70 u-list-item u-radius-20 u-repeater-item u-shape-round u-list-item-1" data-href="volunteer_case_update.html?caseID=${myAdopt.form_id}">
                    <div class="u-container-layout u-similar-container u-container-layout-1">
                        <img class="u-border-7 u-border-grey-5 u-image u-image-default u-image-1" src="${myAdopt.img}" alt="" data-image-width="735" data-image-height="980"/>
                        <h4 class="u-align-left u-text u-text-white u-text-2"><i class="fa-solid fa-paw"></i> ${myAdopt.cat_name}</h4>
                        <p class="u-align-left u-text u-text-3">已初步接受申請，請點擊查看詳情</p>
                    </div>
                </div>
                `;
            }
        }
        
        document.querySelector("#case-box").innerHTML = volCaseHtml;
    }
}
