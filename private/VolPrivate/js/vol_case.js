window.onload = () => {
    adoptCaseData();
};

async function adoptCaseData() {
    const sResp = await fetch("/volunteer_case");
    const adoptStatus = await sResp.json();
    console.log(adoptStatus.length);
    let catAdoptHtml = "";
    document.querySelector("#adopt-box").innerHTML = "";

    if (adoptStatus.length == 0) {
        catAdoptHtml += `
        <div id="empty-card">
            <div class="cat-pic"><i class="fa-solid fa-paw"></i></div>
            <div id="empty-text">
                <div>你尚未收到領養申請</div>
                <div>去發佈新的貓貓讓更多人認識牠吧</div>
                <li class="nav-button" id="empty-button">
                    <a href="volunteer_post_create.html">
                        <div class="cat-logo"><i class="fa-solid fa-paw"></i></div>
                        發佈新貓貓
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
                console.log("hi");
                catAdoptHtml += `
                <a href="volunteer_case_info.html?caseID=${myAdopt.form_id}"><div class="cat-card">
                    <img src="${myAdopt.img}" width="200px" class="cat-image">
                    <div class="status-info">
                        <div class="cat-name"><i class="fa-solid fa-paw"></i>${myAdopt.cat_name}</div>
                        <div class="card-text">已收到領養申請，請審核</div>
                    </div>
                </div></a>
                `;
            } else if (myAdopt.adopt_status == "ACCEPT") {
                catAdoptHtml += `
                <a href="volunteer_case_update.html?caseID=${myAdopt.form_id}"><div class="cat-card">
                    <img src="${myAdopt.img}" width="200px" class="cat-image">
                    <div class="status-info">
                            <div class="cat-name"><i class="fa-solid fa-paw"></i>${myAdopt.cat_name}</div>
                            <div class="card-text">已收到領養者答覆，請點擊查看詳情</div>
                    </div>
                </div></a>
                `;
            }
        }
        document.querySelector("#adopt-box").innerHTML = catAdoptHtml;
    }
}
