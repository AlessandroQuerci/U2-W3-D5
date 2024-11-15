const URL = "https://striveschool-api.herokuapp.com/api/product/";

const fillCards = () => {
  fetch(URL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MjE2YjhhZDEyOTAwMTU4NzZjNzEiLCJpYXQiOjE3MzE2NzA5NjAsImV4cCI6MTczMjg4MDU2MH0.ZDzYnkolnMAbOlpFK2H-rvZpN-OJNcGJZ25obgo1NO4",
    },
  })
    .then((responseObj) => {
      if (responseObj.ok) {
        return responseObj.json();
      } else {
        throw new Error("Errore con la richiesta");
      }
    })
    .then((phones) => {
      console.log(phones);
      phones.forEach((phone) => {
        const row = document.getElementsByClassName("row")[0];
        const col = document.createElement("div");
        col.id = ` ${phone._id}`;
        col.className = "col-4 g-5";

        const card = document.createElement("div");
        card.className = "card border border-0 w-100 h-100";

        const imgCard = document.createElement("img");
        imgCard.src = phone.imageUrl;
        imgCard.className = "img-fluid ";
        imgCard.style.width = "100%";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body w-100 h-100";

        const cardTitle = document.createElement("h5");
        cardTitle.innerText = phone.name;
        cardTitle.className = "card-title fs-3 pb-2";

        const cardText = document.createElement("p");
        cardText.innerText = phone.description;
        cardText.className = "card-text fs-6";

        const cardDown = document.createElement("div");
        cardDown.className = "d-flex  justify-content-between";

        const cardPrice = document.createElement("p");
        cardPrice.innerText = phone.price + "€";
        cardPrice.className = "card-text fs-4";

        const cardBrand = document.createElement("p");
        cardBrand.innerText = phone.brand;
        cardBrand.className = "card-text fs-4";

        const cardBottons = document.createElement("div");
        cardBottons.className = "d-flex  justify-content-between";

        const cardBtnModifica = document.createElement("a");
        cardBtnModifica.textContent = "Modifica";
        cardBtnModifica.className = "btn btn-dark";
        cardBtnModifica.style.width = "40%";
        cardBtnModifica.style.zIndex = "+1";
        cardBtnModifica.href = `../back-office-update.html?id=${phone._id}`;

        const cardBtnElimina = document.createElement("a");
        cardBtnElimina.textContent = "Elimina";
        cardBtnElimina.className = "btn btn-danger";
        cardBtnElimina.style.width = "40%";
        cardBtnElimina.style.zIndex = "+1";
        cardBtnElimina.addEventListener("click", () => {
          eliminaProdotto(phone._id, col);
        });

        row.appendChild(col);
        col.appendChild(card);
        card.appendChild(imgCard);
        card.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardDown);
        cardDown.appendChild(cardPrice);
        cardDown.appendChild(cardBrand);
        cardBody.appendChild(cardBottons);
        cardBottons.appendChild(cardBtnModifica);
        cardBottons.appendChild(cardBtnElimina);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
const eliminaProdotto = (id, col) => {
  fetch(`${URL}${id}`, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MjE2YjhhZDEyOTAwMTU4NzZjNzEiLCJpYXQiOjE3MzE2NzA5NjAsImV4cCI6MTczMjg4MDU2MH0.ZDzYnkolnMAbOlpFK2H-rvZpN-OJNcGJZ25obgo1NO4",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Prodotto rimosso con successo!");
        col.remove();
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

window.onload = () => {
  fillCards();
};
