const location_form = document.getElementById("location-form");
const states = document.getElementById("states");
const districts = document.getElementById("districts");
const resultField = document.getElementById("result");
const result ={
    state:"",
    district:""
}
let stateData = {};

// fetch data function from state-dist-main.json
const fetchState = async ()=>{
    const res = await fetch("./state-dist-main.json");
    const data = await res.json();
    return data;
}

// starting of the script
async function main(){
    stateData = await fetchState();
    stateData.states.forEach((state,i) => {
        states.innerHTML += `<option value="${i}">${state.stateName}</option>`;
    });
}
main();

states.addEventListener("change",function(e){
    let index = e.target.value;
    result.state = stateData.states[index].stateName;
    const districtsList = stateData.states[index].districts;
    districts.innerHTML = "";
    districtsList.forEach(dist => {
        districts.innerHTML += `<option value="${dist}">${dist}</option>`;
    });
})

districts.addEventListener("change",function(e){
    let dist = e.target.value;
    result.district = dist;
})

location_form.addEventListener("submit",function(e){
    e.preventDefault();
    if (!result.state || !result.district) {
        alert("Please select a value");
        return false;
    }
    const {state, district} = result;
    resultField.innerHTML = `Selected state: ${state} <br/> Selected District: ${district}`
    // reset data
    result.state = "";
    result.district ="";
    states.innerHTML = `<option value="select state">select state</option>`;
    districts.innerHTML = `<option value="select districts">select districts</option>`;
    main();
})
