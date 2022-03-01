const searchPhone = () => {
    const searchPhone = document.getElementById('search-field');
    const searchText = searchPhone.value;
    // console.log(searchText);
    searchPhone.value = '';
    if(searchText == ''){
console.log('write sonme thihfsaj');
    }
    else{
        const url = `
        https://openapi.programming-hero.com/api/phones?search=${searchText}
        `
        // console.log(url)
        fetch(url)
        .then(response =>response.json())
        .then(data => displaySearchResult(data.data));
    }
   
}

const displaySearchResult = phones =>{
    // console.log(phones);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if(phones.length == 0){
        console.log('no sadfdsf');
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
                    <h4 class="card-title">${phone.brand}</h4>
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <button onclick="loadPhoneDetail('${phone.slug}')">Detail</button>
                    </div> 
            </div>
            `;
            searchResult.appendChild(div);
        })
    }  

}
const loadPhoneDetail = phoneId => {
    // console.log(phoneId);
    const url = `
    https://openapi.programming-hero.com/api/phone/${phoneId}
    `;
    // console.log(url);
    fetch(url)
    .then(response =>response.json())
    .then(data =>displayPhoneDetail(data.data))

}
const displayPhoneDetail = phone =>{
    console.log(phone);
    const phoneDetail = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${phone.brand}</h5>
                  <h5 class="card-title">${phone.phone_name}</h5>
                
                </div>
    `;
    phoneDetail.appendChild(div);
}