const formUserName = document.getElementById("userName");
const formProCat = document.getElementById("userProCat");
const formDlvryPin = document.getElementById("userPinCode");
const formCountryCode = document.getElementById("userCountryCode");
const formPhoneNo = document.getElementById("userPhone");
const formProCost = document.getElementById("userProductPrice");
const formDlvryDate = document.getElementById("userProductDd");
const formSubmitButton = document.getElementById("formBtn");

document.addEventListener("DOMContentLoaded", getAllData);

formSubmitButton.addEventListener("click", formSubmit);

async function formSubmit(e) {
  e.preventDefault();
  const data = {
    clientName: formUserName.value,
    clientProCat: formProCat.value,
    clientPinCode: formDlvryPin.value,
    clientCountryCode: formCountryCode.value,
    clientPhone: formPhoneNo.value,
    clientProCost: formProCost.value,
    clientDlvryDate: formDlvryDate.value,
  };
  console.log(data);

  const responseData = await sendData(data);

  if (
    responseData.clientName &&
    responseData.clientProCat &&
    responseData.clientPinCode &&
    responseData.clientCountryCode &&
    responseData.clientPhone &&
    responseData.clientProCost &&
    responseData.clientDlvryDate
  ) {
    uiCreator(responseData);
    formUserName.value = "";
    formProCat.value = "";
    formDlvryPin.value = "";
    formCountryCode.value = "";
    formPhoneNo.value = "";
    formProCost.value = "";
    formDlvryDate.value = "";
  } else {
    alert("please fill the form");
  }
}

async function sendData(formData) {
  const response = await fetch(
    "https://crudcrud.com/api/a8627ace9fdd41b8a4a12575be596264/listData",
    {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  return data;
}

function uiCreator(responseData) {
  const card = document.createElement("div");
  card.classList.add("list");

  const clientName = document.createElement("h1");
  clientName.innerHTML = responseData?.clientName;

  const clientProCat = document.createElement("h1");
  clientProCat.innerHTML = responseData?.clientProCat;

  const clientPinCode = document.createElement("h1");
  clientPinCode.innerHTML = responseData?.clientPinCode;

  const clientCountryCode = document.createElement("h1");
  clientCountryCode.innerHTML = responseData?.clientCountryCode;

  const clientPhone = document.createElement("h1");
  clientPhone.innerHTML = responseData?.clientPhone;

  const clientProCost = document.createElement("h1");
  clientProCost.innerHTML = responseData?.clientProCost;

  const clientDlvryDate = document.createElement("h1");
  clientDlvryDate.innerHTML = responseData?.clientDlvryDate;

  card.appendChild(clientName);
  card.appendChild(clientProCat);
  card.appendChild(clientPinCode);
  card.appendChild(clientProCost);
  card.appendChild(clientPinCode);
  card.appendChild(clientPhone);
  card.appendChild(clientDlvryDate);

  const listContainer = document.getElementById("listContainer");
  listContainer.appendChild(card);
}

async function getAllData() {
  const receivedData = await fetch(
    "https://crudcrud.com/api/a8627ace9fdd41b8a4a12575be596264/listData",
    {
      method: "GET",
    }
  );
  const data = await receivedData.json();

  for (let i = 0; i <= data.length; i++) {
    uiCreator(data[i]);
  }
}
