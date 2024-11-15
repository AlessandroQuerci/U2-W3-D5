const URL = "https://striveschool-api.herokuapp.com/api/product/";
const nomeProdotto = document.getElementById("nomeProdotto");
const copyProdotto = document.getElementById("descrizione");
const brandProdotto = document.getElementById("brand");
const imgProdotto = document.getElementById("imgProdotto");
const prezzoProdotto = document.getElementById("prezzo");
const btnProdotto = document.getElementById("btnProdotto");
const formProdotto = document.querySelector("form");

formProdotto.onsubmit = (event) => {
  event.preventDefault();

  let newProduct = {
    name: nomeProdotto.value,
    description: copyProdotto.value,
    brand: brandProdotto.value,
    imageUrl: imgProdotto.value,
    price: prezzoProdotto.value,
  };

  addProduct(newProduct);
};

const addProduct = (addedProduct) => {
  console.log(addedProduct);
  fetch(URL, {
    method: "POST",
    body: JSON.stringify(addedProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MjE2YjhhZDEyOTAwMTU4NzZjNzEiLCJpYXQiOjE3MzE2NzA5NjAsImV4cCI6MTczMjg4MDU2MH0.ZDzYnkolnMAbOlpFK2H-rvZpN-OJNcGJZ25obgo1NO4",
    },
  })
    .then((responseObj) => {
      if (responseObj.ok) {
        return responseObj.json();
      } else {
        throw new Error("Errore nella richiesta");
      }
    })
    .then((product) => {
      console.log("Prodotto aggiunto con successo:", product);
      formProdotto.reset();
    })
    .catch((error) => {
      console.log(error);
    });
};
