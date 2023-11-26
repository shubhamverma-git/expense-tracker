const formUserName = document.getElementById("userName");
const formProCat = document.getElementById("userProCat");
const formDlvryPin = document.getElementById("userPinCode");
const formCountryCode = document.getElementById("userCountryCode");
const formPhoneNo = document.getElementById("userPhone");
const formProCost = document.getElementById("userProductPrice");
const formDlvryDate = document.getElementById("userProductDd");
const formSubmitButton = document.getElementById("formBtn");

let id = "";

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

  const responseData = await sendData(data, id);

  uiCreator(responseData);
  formUserName.value = "";
  formProCat.value = "";
  formDlvryPin.value = "";
  formCountryCode.value = "";
  formPhoneNo.value = "";
  formProCost.value = "";
  formDlvryDate.value = "";
}

async function sendData(formData, id) {
  if (id == "") {
    const response = await fetch(
      "https://crudcrud.com/api/20872c9de2bf4f70ad5ef283ef95ad3b/listData",
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
  } else {
    const response = await fetch(
      `https://crudcrud.com/api/20872c9de2bf4f70ad5ef283ef95ad3b/listData/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "content-Type": "application/json",
        },
      }
    );
    // const res = await response.json();
    // console.log(res);
  }
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

  const editElement = document.createElement("div");
  editElement.classList.add("control_container");

  const editIcon = document.createElement("span");
  editIcon.innerHTML = "✏️";

  editIcon.addEventListener("click", () => {
    editData(responseData);
  });
  editElement.appendChild(editIcon);
  card.appendChild(editElement);

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
    "https://crudcrud.com/api/20872c9de2bf4f70ad5ef283ef95ad3b/listData",
    {
      method: "GET",
    }
  );
  const data = await receivedData.json();
  console.log(data);

  for (let i = 0; i <= data.length; i++) {
    uiCreator(data[i]);
  }
}

// Edit data

async function editData(data) {
  id = data._id;
  formUserName.value = data.clientName;
  formProCat.value = data.clientProCat;
  formDlvryPin.value = data.clientPinCode;
  formCountryCode.value = data.clientCountryCode;
  formPhoneNo.value = data.clientPhone;
  formProCat.value = data.clientProCat;
  formDlvryDate.value = data.clientDlvryDate;
  formProCost.value = data.clientProCost;
}
