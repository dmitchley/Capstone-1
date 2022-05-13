
//array 
let customerArray = [];

// will be used in the append child method
let body = document.getElementById('body');

let details = document.getElementById('details')



// constructor function [property,value]

function customer(Address, City, Province, ZIP) {
    this.Address = Address
    this.City = City;
    this.Province = Province;
    this.ZIP = ZIP;
   
}



// to get user input data
function addArtist() {
    let newCustomer = new customer(
        document.getElementById('Artist-Name').value,
        document.getElementById('artist').value,
        document.getElementById('album').value,
        document.getElementById('year').value,
    );
    // push new array into array
    customerArray.push(newCustomer);
    // add data to local storage
    localStorage.CustomerArray = JSON.stringify(customerArray);
}

// check if local storage has any data in it, if true there is some data stored in local storage

if (localStorage.CustomerArray) {
    customerArray = JSON.parse(localStorage.CustomerArray)

    console.log(customerArray);
    // the in keyword loops through each key in the customerArray array
    for (let i in customerArray) {

        // tr for each object in the customerArray array
        let table_row = document.createElement('tr')
        table_row.classList.add("text-dark");
       







        // within each object
        // [key, value] = placeholder

        for (let [key, value] of Object.entries(customerArray[i])) {
            var div = document.createElement('th')
            div.contentEditable = 'true';
            div.innerHTML = value;
            div.oninput = function (e) {
                customerArray[i][key] = e.target.innerText
                localStorage.CustomerArray = JSON.stringify(customerArray);

            }

            table_row.appendChild(div)
        }
        details.appendChild(table_row)
        div.appendChild(dltButton)

    }
}


 