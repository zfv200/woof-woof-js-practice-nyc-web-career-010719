document.addEventListener("DOMContentLoaded", () => {
  let url = "http://localhost:3000/pups"
  let dogs = []

//step one: fetch data
  function fetchDogs(){
    fetch(url)
    .then(r=>r.json())
    .then(json=>{
      dogs = json
      appendDogsToPage(dogs)
    })
  }

  function editDog(dog){
    //do a bunch of code to edit a dog

    //is it going to be true or false
    let value = getEditValue(dog)
    fetch(`${url}/${dog.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify({
        isGoodDog: value
      })
    }).then(r=>r.json())
    .then(json=>{
      // fetchDogs()
      dog.isGoodDog = value
    })
  }

  function getEditValue(dog){
    return dog.isGoodDog === false ? true : false
  }

//step two: append data to page:
  function appendDogsToPage(dogs){
    let dogBar = document.querySelector('#dog-bar')
    dogBar.innerHTML = ""
    dogs.forEach(dog=>{
      let moreHTML = appendSingleDog(dog)
      dogBar.innerHTML += moreHTML
    })
  }

  function addMasterEventListener(){
    document.addEventListener('click', (event)=>{
      if (event.target.tagName === "SPAN"){
        let dog = dogs.find(dog=>dog.id===parseInt(event.target.dataset.id))
        doThisWhenIClickADogName(dog)
      }
      if(event.target.id==="this-is-the-button-I-want-to-click"){
        console.log("filter button");
      }
      if (event.target.dataset.id==="dog-button"){
        let dog = dogs.find(dog=>dog.id===parseInt(event.target.id))
        editDog(dog)
      }
    })
  }

  function doThisWhenIClickADogName(dog){
    let dogInfo = document.querySelector('#dog-info')

    if (dog.isGoodDog === true){
      dogInfo.innerHTML = `
      <img src=${dog.image}>
      <h2>${dog.name}</h2>
      <button id=${dog.id} data-id="dog-button">Good Dog!</button>
      `
    } else {
        dogInfo.innerHTML = `
        <img src=${dog.image}>
        <h2>${dog.name}</h2>
        <button id=${dog.id} data-id="dog-button">Bad Dog!</button>
        `
    }
    //bad dog if false, good dog if true
  }

  function appendSingleDog(dog){
    return `<span data-id=${dog.id}>${dog.name}</span>`
  }

  fetchDogs()
  addMasterEventListener()
});
