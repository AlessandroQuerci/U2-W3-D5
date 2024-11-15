const URL = "https://striveschool-api.herokuapp.com/api/product/";
const nomeProdotto = document.getElementById("nomeProdotto");
const copyProdotto = document.getElementById("descrizione");
const brandProdotto = document.getElementById("brand");
const imgProdotto = document.getElementById("imgProdotto");
const prezzoProdotto = document.getElementById("prezzo");
const btnReset = document.getElementById("btnReset");
const formProdotto = document.querySelector("form");
const btnConferma = document.getElementById("btnConferma");

window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
    console.log("ID prodotto passato nella query string:", productId);

    fetch(URL + `${productId}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MjE2YjhhZDEyOTAwMTU4NzZjNzEiLCJpYXQiOjE3MzE2NzA5NjAsImV4cCI6MTczMjg4MDU2MH0.ZDzYnkolnMAbOlpFK2H-rvZpN-OJNcGJZ25obgo1NO4",
      },
    })
      .then((response) => response.json())
      .then((phones) => {
        console.log("Dati prodotto:", phones);
        nomeProdotto.value = phones.name;
        prezzoProdotto.value = phones.price;
        copyProdotto.value = phones.description;
        brandProdotto.value = phones.brand;
        imgProdotto.value = phones.imageUrl;

        btnReset.onclick = () => {
          formProdotto.reset();
        };
        btnConferma.onclick = () => {
          btnConferma.href = "../homepage.html";
          fetch(URL + `${productId}`, {
            method: "PUT",
            body: JSON.stringify(phones),
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
            .then((phones) => {
              nomeProdotto.value = phones.name;
              prezzoProdotto.value = phones.price;
              copyProdotto.value = phones.description;
              brandProdotto.value = phones.brand;
              imgProdotto.value = phones.imageUrl;
              console.log("Prodotto aggiunto con successo:", phones.name);
              formProdotto.reset();
            })
            .catch((error) => {
              console.log(error);
            });
        };
      })
      .catch((error) => {
        console.error("Errore nel recupero del prodotto", error);
      });
  } else {
    console.log("Nessun ID prodotto trovato nella query string");
  }
};
