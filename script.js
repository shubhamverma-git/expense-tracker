const userForm = document.getElementById("myForm");
const userName = document.getElementById("formName");
const proCat = document.getElementById("productCategory");
const dlvryPin = document.getElementById("pinCode");
const proCost = document.getElementById("productPrice");
const dlvryDate = document.getElementById("productDd");
const formButton = document.getElementById("formBtn");

formButton.addEventListener("click", formSubmit);

async function formSubmit(e) {
  e.preventDefault();
  const data = {
    name: userName.value,
    cat: proCat.value,
    pin: dlvryPin.value,
    cost: proCost.value,
    date: dlvryDate.value,
  };
  console.log(data);

  const responseData = await sendData(data);

  if (responseData.name && responseData.cat) {
    uiCreator(responseData);
    userName.value = "";
    proCat.value = "";
    dlvryPin.value = "";
    proCost.value = "";
    dlvryDate.value = "";
  } else {
    alert("please fill the form");
  }
}

async function sendData(formData) {
  const res = await fetch(
    "https://crudcrud.com/api/50d7474d5fab4bbb91db81349a8fc1bc/listData",
    {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-Type": "application/json",
      },
    }
  );
  const data = await res.json();

  return data;
}

function uiCreator(responseData) {
  const card = document.createElement("div");
  card.classList.add("list");

  const name = document.createElement("h1");
  name.innerHTML = responseData.name;

  const cat = document.createElement("h1");
  cat.innerHTML = responseData.cat;

  const pin = document.createElement("h1");
  pin.innerHTML = responseData.pin;

  const cost = document.createElement("h1");
  cost.innerHTML = responseData.cost;

  const date = document.createElement("h1");
  date.innerHTML = responseData.date;

  card.appendChild(name);
  card.appendChild(cat);
  card.appendChild(pin);
  card.appendChild(cost);
  card.appendChild(date);

  const listContainer = document.getElementById("listContainer");
  listContainer.appendChild(card);
}

async function getAllData() {
  const receivedData = fetch(
    "https://crudcrud.com/api/50d7474d5fab4bbb91db81349a8fc1bc/listData",
    {
      method: "GET",
    }
  );
  const data = await receivedData.json();

  for (let i = 0; i <= data.length; i++) {
    uiCreator(data[i]);
  }
}
