axios.get('https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=8')
let citys = [
  {
    arbicname:"القاهرة",
    name:"Cairo"
  },
  {
    arbicname:"اسكندريه",
    name:"Alexandria"
  }
]

for(let city of citys){
  let contant = `<option>${city.arbicname}</option>`;
  document.getElementById("city-select").innerHTML += contant
}

  document.getElementById("city-select").addEventListener("change", function(){
    let cityname1 = ""
    for(let city of citys){
      if(city.arbicname  == this.value){
        cityname1 = city.name
      }
    }
    getpraytime(cityname1)
  });
  
  function getpraytime(cityname){
    let parms = {
      city: cityname,
      country: "Egypt"
  }

  axios.get('https://api.aladhan.com/v1/timingsByCity', {params:parms}).then(function (response){
  const time1 = response.data.data.timings
  const date = response.data.data.date.readable
  filltimepray("fajr" , time1.Fajr)
  filltimepray("dhuhr" , time1.Dhuhr)
  filltimepray("asr" , time1.Asr)
  filltimepray("maghrib" , time1.Maghrib)
  filltimepray("isha" , time1.Isha)
  document.getElementById("location-date1").innerHTML = date
  })
  .catch(function (error) {
    console.log(error);
  })

}
  function filltimepray(id , time){
    document.getElementById(id).innerHTML = time
  }
 getpraytime("Alexandria")

