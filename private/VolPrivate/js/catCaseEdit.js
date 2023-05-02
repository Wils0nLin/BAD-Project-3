window.onload = () => {
    catProfileData();
};

async function catProfileData() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    console.log(urlSearchParams.get("caseID"));

    const resp = await fetch(`/getEditCaseDetails/${urlSearchParams.get("caseID")}`);

    const catProfile = await resp.json();
const catDateFormat = catProfile.age.substring(0, 10);


    console.log(catProfile);
    const today = new Date().getFullYear();
    const cat_birth_year = new Date(catProfile.age).getFullYear();
    const catAge = today - cat_birth_year;

    let htmlStr;
    htmlStr = `
    <div id="cat-data">
        <div>
            <div class="cat-name"><i class="fa-solid fa-paw"></i>${catProfile.cat_name}</div>
            <div><i class="fa-solid fa-calendar-days"></i>歲數<input type="text" class="text-box text-box-spread" name="characters" value="${catAge}"></div>
            <div><i class="fa-solid fa-restroom"></i>性別<input type="text" class="text-box text-box-spread" name="characters" value="${catProfile.gender}"></div>
            <div><i class="fa-solid fa-cat"></i>品種<input type="text" class="text-box text-box-spread" name="characters" value="${catProfile.breed}"></div>
        </div>
        <div id="image-box">
            <div id="cat-image-main"><img src="${catProfile.img[0]}" id="cat-image" width="200px"></div>
            <div id="image-list"></div>
        </div>
    </div>
    <div id="user-data">
        <div class="user-data-spread">
            <div class="data-col"> 
                <div><i class="fa-solid fa-face-smile"></i>性格</div>
                <input type="text" class="text-box text-box-profile" name="characters" value="${catProfile.characters}">
            </div>
            <div class="data-col">
                <div><i class="fa-solid fa-fish"></i>進食習慣</div>
                <input type="text" class="text-box text-box-profile" name="food_habits" value="${catProfile.food_habits}">
            </div>
            <div class="data-col">
                <div><i class="fa-solid fa-stethoscope"></i>身體狀況</div>
                <input type="text" class="text-box text-box-profile" name="cat_health" value="${catProfile.cat_health}">
            </div>
            <div class="data-col">
                <div><i class="fa-solid fa-file"></i>簡介</div>
                <textarea id="intro" name="intro" form="intro" value="" class="text-box text-box-intro" style="resize: none; height: 100px; font-size: 1.2em;">${catProfile.intro}</textarea>
            </div>
        </div>
        <div class="user-data-spread"></div>
    </div>
    <input type="button" class="dark-button" id="adopt-button" value="提交修改">`;
    document.querySelector("#profile-content").innerHTML = htmlStr;
}
