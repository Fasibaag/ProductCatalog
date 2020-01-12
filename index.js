(function() {
  var productdata = [];
  var getData = async function() {
    var data = await fetch(
      "https://gist.githubusercontent.com/bharadwajturlapati/4e81154dbcc7d6928921b96057fc5b4a/raw/d31da32d6e5c1dd2a11968d7e94d3c60dfd50fcb/products.json"
    );
    data
      .json()
      .then(x => {
        productdata = Object.entries(x).map(([_key, value]) => {
          return value;
        });
        return productdata;
      })
      .then(data => {
        render(data);
      });
  };
  getData();

  var template = document.querySelector("#productitem");

  // Clone the new row and insert it into the table
  var section = document.querySelector(".section");

  function render(productlist) {
    reset();
    productlist.forEach((data, i) => {
      var clone = document.importNode(template.content, true);
      var item = clone.querySelector(".item");
      item.querySelector("img").src = data.image;
      // item.querySelector('.hub').textContent = '#'+data.hub;
      item.querySelector(".authors").textContent = data.name;
      item.setAttribute("data", data.hub);
      if (!(i % 3)) item.querySelector(".sale").style.display = "block";
      section.appendChild(item);
    });

    function reset() {
      section.innerHTML = "";
    }

    var categoryGeneralEl = document.getElementById("general");
    categoryGeneralEl.addEventListener("click", () => {
      filterList("general");
      categoryGeneralEl.classList.add("active");
      categoryOtherEl.classList.remove("active");
      resetEl.classList.remove("active");

    });

    var categoryOtherEl = document.getElementById("other");
    categoryOtherEl.addEventListener("click", () => {
      filterList("other");
      categoryGeneralEl.classList.remove("active");
      resetEl.classList.remove("active");

      categoryOtherEl.classList.add("active");
    });

    var resetEl = document.getElementById("reset");
    resetEl.addEventListener("click", () => {
      filterList();
      categoryGeneralEl.classList.remove("active");
      categoryOtherEl.classList.remove("active");
      resetEl.classList.add("active");
    });

    function filterList(filterBy) {
      if (typeof filterBy === "undefined") {
        render(productdata);
      } else {
        let filteredData =
          productdata &&
          productdata.filter(el => {
            return filterBy == "general"
              ? el.hub == filterBy
              : el.hub != "general";
          });
        render(filteredData);
      }
    }
  }
})();
