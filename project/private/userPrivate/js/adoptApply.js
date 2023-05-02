window.onload = () => {
    adoptCaseData();
};

async function adoptCaseData() {
    const sResp = await fetch("/applyStatusData");
    const adoptStatus = await sResp.json();
    console.log(adoptStatus);
    let catAdoptHtml = "";
    document.querySelector("#adopt-box").innerHTML = "";

    if (adoptStatus.length == 0) {
        catAdoptHtml += `
        <div id="empty-card">
            <div class="cat-pic"><i class="fa-solid fa-paw"></i></div>
            <div id="empty-text">
                <div>你尚未提出申請領養</div>
                <div>去看看有哪些貓貓正等待着你吧</div>
                <li class="nav-button" id="empty-button">
                    <a href="user_adoptPage.html">
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
            <div class="cat-card card-pending">
                <img src="${myAdopt.img}" class="cat-image">
                <div class="status-info">
                    <div class="cat-name"><i class="fa-solid fa-paw"></i>${myAdopt.cat_name}</div>
                    <div class="card-text">你的申請已遞交，正在審核</div>
                </div>
            </div>
            `;
            } else if (myAdopt.adopt_status == "REJECT") {
                catAdoptHtml += `
                <div class="cat-card card-pending">
                    <img src="${myAdopt.img}" class="cat-image">
                    <div class="status-info">
                        <div class="cat-name"><i class="fa-solid fa-paw"></i>${myAdopt.cat_name}</div>
                        <div class="card-text">你的申請已被拒絕</div>
                    </div>
                </div>
                `;
            } else if (myAdopt.adopt_status == "ACCEPT") {
                catAdoptHtml += `
                <a href="user_applicationStatus.html?caseID=${myAdopt.form_id}"><div class="cat-card">
                    <img src="${myAdopt.img}" width="200px" class="cat-image">
                    <div class="status-info">
                        <div class="cat-name"><i class="fa-solid fa-paw"></i>${myAdopt.cat_name}</div>
                        <div class="card-text">義工已初步接受申請，請點擊查看詳情</div>
                    </div>
                </div></a>
                `;
            }
        }}
    document.querySelector("#adopt-box").innerHTML = catAdoptHtml;
}
