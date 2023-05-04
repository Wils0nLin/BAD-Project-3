window.onload = () => {
    catProfileData();
};

async function catProfileData() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    console.log(urlSearchParams.get("caseID"));

    const resp = await fetch(`/volunteer_post_info/${urlSearchParams.get("caseID")}`);

    const catProfile = await resp.json();

const catDateFormat = catProfile.age.substring(0, 10);

 
    console.log(catProfile);
  
    let htmlStr;
    htmlStr = `
    <div id="cat-data">
        <div>
            <div class="cat-name"><i class="fa-solid fa-paw"></i>${catProfile.cat_name}</div>
            <div><i class="fa-solid fa-calendar-days"></i>歲數<input type="text" class="text-box text-box-spread" name="age" value="${catDateFormat}"></div>
            <div><i class="fa-solid fa-restroom"></i>性別<input type="text" class="text-box text-box-spread" name="gender" value="${catProfile.gender}"></div>
            <div><i class="fa-solid fa-cat"></i>品種<input type="text" class="text-box text-box-spread" name="breed" value="${catProfile.breed}"></div>
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
    <input type="submit" class="dark-button" id="adopt-button" value="提交修改">`;
    document.querySelector("#profile-content").innerHTML = htmlStr;

    const formData = document.querySelector("#content-box");

    formData.addEventListener("submit", async (event) => {
        console.log("hi")
        event.preventDefault();
        const form = event.target;
       
        console.log(document.querySelector("#intro").value )
        // const formData = new FormData(form);
        // console.log(intro.value);
        // formData.append("intro", intro.value);

        const age = form.age.value;
        const gender = form.gender.value;
        const breed = form.breed.value;
        const characters = form.characters.value;
        const food_habits = form.food_habits.value;
        const cat_health = form.cat_health.value;
        const intro = document.querySelector("#intro").value;

        let formObject = {
            age,
            gender,
            breed,
            characters,
            food_habits,
            cat_health,
            intro,
        };
        console.log(formObject);

        // for (const v of formData.values()) {
        //     console.log(v);
        // }
        // console.log(JSON.stringify(formData));
        // console.log(urlSearchParams.get("caseID"));
        const urlSearchParams = new URLSearchParams(window.location.search);
        const caseID = urlSearchParams.get("caseID");

        const response = await fetch(`/volunteer_post_update/${caseID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            // headers: {
            //     "Content-Type": "application/x-www-urlencoded",
            // },
            body: JSON.stringify(formObject),
        });

        if (response.status === 200) {
            const data = await response.json();
            window.location = `/vol_postAdoptCase.html?caseID=${caseID}`;
            console.log(data);
            alert("修改成功");
        } else {
            alert("未能修改");
        }
    });
}

