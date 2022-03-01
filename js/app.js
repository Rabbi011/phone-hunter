// searching Phone
const searchPhone = () => {
    const searchPhone = document.getElementById('search-field');
    const searchText = searchPhone.value;
    searchPhone.value = '';
    if(searchText == ''){
      document.getElementById('noWrite-error-handling').style.display = 'block';
      document.getElementById('error-handling').style.display ='none';
    }
    else{
        const url = `
        https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
        .then(response =>response.json())
        .then(data => displaySearchResult(data.data));
        document.getElementById('noWrite-error-handling').style.display = 'none';
    }
   
}
//  searching result part
const displaySearchResult = phones =>{
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    if(phones.length == 0){
        
       document.getElementById('error-handling').style.display ='block';
       document.getElementById('noWrite-error-handling').style.display = 'none';
    }
    else{
        phones.slice(0,20).forEach(phone => {
           
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
        // error handling part
        document.getElementById('error-handling').style.display ='none';
    }  

}
// data load part
const loadPhoneDetail = phoneId => {
    const url = `
    https://openapi.programming-hero.com/api/phone/${phoneId}
    `;
    fetch(url)
    .then(response =>response.json())
    .then(data =>displayPhoneDetail(data.data))
}
// display part
const displayPhoneDetail = phone =>{
    const phoneDetail = document.getElementById('phone-details');
    phoneDetail.textContent ='';
    const div = document.createElement('div');
    div.classList.add('card');

    const releases = release =>{
        if(release == ''){
            return 'No release date';
        }
        else{
           return release;
        }
    }
    
    // display innerHTML 
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h4 class="card-title">Brand: ${phone.brand}</h4>
                  <h5 class="card-title"> Model Name: ${phone.name}</h5>
                  <h5 class="card-title"> Release Date: ${releases(phone.releaseDate)}</h5
                  <h5 class="card-title"> ChipSet: ${phone.mainFeatures.chipSet}</h5>
                  <h5 class="card-title"> DisplaySize: ${phone.mainFeatures.displaySize}</h5>
                  <h5 class="card-title"> Memory: ${phone.mainFeatures.memory}</h5>
                  <h5 class="card-title"> Storage: ${phone.mainFeatures.storage}</h5>
                  <h5 class="card-title"> Sensors: ${phone.mainFeatures.sensors}</h5>
                  <h5 class="card-title"> Bluetooth: ${phone.others.Bluetooth}</h5>
                  <h5 class="card-title"> GPS: ${phone.others.GPS}</h5>
                  <h5 class="card-title"> NFC: ${phone.others.NFC}</h5>
                  <h5 class="card-title"> Radio: ${phone.others.Radio}</h5>
                  <h5 class="card-title"> USB: ${phone.others.USB}</h5>
                  <h5 class="card-title"> WLAN: ${phone.others.WLAN}</h5>
                  
                  
                </div>
    `;
    phoneDetail.appendChild(div);
}



