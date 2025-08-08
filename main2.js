let citys = [
    { arbicname: "القاهرة", name: "Cairo" },
    { arbicname: "اسكندريه", name: "Alexandria" },
    { arbicname: "الرياض", name: "Riyadh" }
];

// تعبئة قائمة المدن
for(let city of citys){
    let option = `<option>${city.arbicname}</option>`;
    document.getElementById("city-select").innerHTML += option;
}

// عند اختيار مدينة
document.getElementById("city-select").addEventListener("change", function(){
    let cityEnglish = "";
    for(let city of citys){
        if(city.arbicname === this.value){
            cityEnglish = city.name;
            document.getElementById("city-name").innerHTML = city.arbicname;
        }
    }
    getpraytime(cityEnglish);
});

// جلب أوقات الصلاة
function getpraytime(cityname){
    axios.get('https://api.aladhan.com/v1/timingsByCity', {
        params: {
            city: cityname,
            country: "Egypt",
            method: 8
        }
    }).then(function(response){
        const timings = response.data.data.timings;
        const readableDate = response.data.data.date.readable;
        const weekdayArabic = response.data.data.date.hijri.weekday.ar;
        const fullDate = `${weekdayArabic} ${readableDate}`;

        // تعبئة أوقات الصلاة
        filltimepray("fajr", timings.Fajr);
        filltimepray("sunrise", timings.Sunrise);
        filltimepray("dhuhr", timings.Dhuhr);
        filltimepray("asr", timings.Asr);
        filltimepray("maghrib", timings.Maghrib);
        filltimepray("isha", timings.Isha);

        // تعبئة التاريخ
        document.getElementById("location-date1").innerHTML = fullDate;
    }).catch(function(error){
        console.error(error);
    });
}

// تعبئة عنصر واحد
function filltimepray(id, time){
    document.getElementById(id).innerHTML = time;
}

// تحميل أول مدينة تلقائيًا
getpraytime("Cairo");
