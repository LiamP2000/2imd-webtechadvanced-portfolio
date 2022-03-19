export default class App {
    constructor(API_KEY){
        this.API_KEY = API_KEY;
        this.lat = 0;
        this.lng = 0;
        this.getLocation();
        this.printHobby(this.getHobby());
    }

    getLocation(){
        console.log("gettin location");
        navigator.geolocation.getCurrentPosition(
            this.locationSuccess.bind(this), 
            this.locationError.bind(this)
            );

    }

    locationSuccess(location){
        this.lat = location.coords.latitude;
        this.lng = location.coords.longitude;
        this.getWeather();

    }

    getWeather(){
        console.log("lukt da?")
        let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${this.lat}&lon=${this.lng}&appid=${this.API_KEY}`
        console.log(url);
        fetch(url).then(res => {
            return res.json();
        }).then(json => {
            console.log(json);
            this.printWeather(json);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            console.log("finally done");
        });

    }

    printWeather(json){
        let summary = json.weather[0].description;
        console.log(summary);
        let temp = Math.round(json.main.temp);
        console.log(temp);
        let place = json.name;
        document.querySelector("#place").innerHTML = place;
        document.querySelector("#status").innerHTML = summary;
        document.querySelector("h2").innerHTML = temp + "°C";
    }

    getHobby(){
        fetch("https://hobbies-by-api-ninjas.p.rapidapi.com/v1/hobbies?category=general", {
	    "method": "GET",
	    "headers": {
		"x-rapidapi-host": "hobbies-by-api-ninjas.p.rapidapi.com",
		"x-rapidapi-key": "c3231c4facmshf9299219d57620ep1bf3bbjsn9e77f8e0c2e2"
	    }
        
        }).then(res => {
            return res.json();
        }).then(response => {
            const get = response;
            console.log(get.hobby);
            this.printHobby(get);
            this.printLink(get);
        }).catch(err => {
            console.error(err);
        });
    }



    printHobby(json){
        try{
            const hobby = json.hobby;
        document.querySelector("#hobby").innerHTML = hobby;
        }catch(err){ //to catch type error
            console.log(err);
        }
    }

    printLink(json){
        try{
            const link = json.link;
            var a = document.getElementById("a");
            a.setAttribute("href", link);
            
        }catch(err){
            console.log(err);
        }
    }

    
    

    locationError(err){
        console.log(err);
    }
}



