const searchPhone = () => {
    const searchPhone = document.getElementById('search-field');
    const searchText = searchPhone.value;
    // console.log(searchText);
    searchPhone.value = '';
    if(searchText == ''){
      document.getElementById('noWrite-error-handling').style.display = 'block';
      document.getElementById('error-handling').style.display ='none';
    }
    else{
        const url = `
        https://openapi.programming-hero.com/api/phones?search=${searchText}
        `
        // console.log(url)
        fetch(url)
        .then(response =>response.json())
        .then(data => displaySearchResult(data.data));
        document.getElementById('noWrite-error-handling').style.display = 'none';
    }
   
}
//  searching part
const displaySearchResult = phones =>{
    // console.log(phones);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if(phones.length == 0){
       document.getElementById('error-handling').style.display ='block';
       document.getElementById('noWrite-error-handling').style.display = 'none';
    }
    else{
        phones.forEach(phone => {
            // console.log(phone);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML =`
            <div class="card">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h4 class="card-title"> Brand: ${phone.brand}</h4>
                      <h5 class="card-title"> Model Name: ${phone.phone_name}</h5>
                      <button onclick="loadPhoneDetail('${phone.slug}')">Detail</button>
                    </div> 
            </div>
            `;
             searchResult.appendChild(div);
            
        })

       
        document.getElementById('error-handling').style.display ='none';
    }  

}
// data load part
const loadPhoneDetail = phoneId => {
    // console.log(phoneId);
    const url = `
    https://openapi.programming-hero.com/api/phone/${phoneId}
    `;
    // console.log(url);
    fetch(url)
    .then(response =>response.json())
    .then(data =>displayPhoneDetail(data.data))
    console.log(data)

}
// display part
const displayPhoneDetail = phone =>{
    console.log();
    const phoneDetail = document.getElementById('phone-details');
    phoneDetail.textContent ='';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h4 class="card-title">Brand: ${phone.brand}</h4>
                  <h5 class="card-title"> Model Name: ${phone.name}</h5>
                  <h5 class="card-title"> Release Date:${phone.releaseDate}</h5>
                  <h5 class="card-title"> ChipSet:${phone.mainFeatures.chipSet}</h5>
                  <h5 class="card-title"> DisplaySize:${phone.mainFeatures.displaySize}</h5>
                  <h5 class="card-title"> Memory:${phone.mainFeatures.memory}</h5>
                  <h5 class="card-title"> Storage:${phone.mainFeatures.storage}</h5>
                </div>
    `;
    phoneDetail.appendChild(div);
}