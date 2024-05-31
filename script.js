let form = document.querySelector("form");
let cardContain = document.querySelector(".container");

function activate() {
  let buttons = document.querySelectorAll(".btn button");
  buttons.forEach((button) => {
    button.removeEventListener("click", acivateButtons); // Prevent multiple bindings
    button.addEventListener("click", acivateButtons);
  });
}

function acivateButtons(e) {
  let text = e.target.textContent;
  let scoreElement = e.target.closest(".board").querySelector(".details p:nth-child(3)");
  let score = parseInt(scoreElement.innerText);

  if (text == "🗑") {
    e.target.closest(".board").remove();
  } else if (text == "+5") {
    scoreElement.innerText = score + 5;
    animateScoreChange(scoreElement, "green");
  } else if (text == "-5") {
    scoreElement.innerText = score - 5;
    animateScoreChange(scoreElement, "red");
  }
  sorting();
}

function animateScoreChange(element, color) {
  element.style.transform = "scale(2)";
  element.style.transition = "0.4s ease-out";
  setTimeout(() => {
    element.style.transform = "scale(1)";
    element.style.color = color;
  }, 100);
}

function sorting() {
  let cards = [...document.querySelectorAll(".board")];

  cards.sort((a, b) => {
    return (
      parseInt(b.querySelector(".details p:nth-child(3)").textContent) -
      parseInt(a.querySelector(".details p:nth-child(3)").textContent)
    );
  });

  cardContain.innerHTML = '';
  cards.forEach((card) => {
    cardContain.appendChild(card);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let fname = e.target.children[0].value;
  let lname = e.target.children[1].value;
  let country = e.target.children[2].value;
  let num = e.target.children[3].value;
  let error = document.querySelector(".incorrect");

  if (fname === "" || lname === "" || country === "" || num === "") {
    error.style.display = "inline";
    return;
  } else {
    error.style.display = "none";
  }

  let dates = new Date();
  let monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let month = monthArr[dates.getMonth()];
  let year = dates.getFullYear();
  let hour = dates.getHours();
  let minute = dates.getMinutes();
  let second = dates.getSeconds();
  let finalDate = `${month} ${year}: ${hour}:${minute}:${second}`;

  let element = document.createElement("div");
  element.classList.add("board");
  element.innerHTML = `
    <div class="details">
        <div class="name">
            <p>${fname} ${lname}</p>
            <p class="date">${finalDate}</p>
        </div>
        <p>${country}</p>
        <p>${num}</p>
    </div>
    <div class="btn">
        <button>🗑</button>
        <button>+5</button>
        <button>-5</button>
    </div>
  `;

  cardContain.appendChild(element);
  activate();
  sorting();
});

sorting();
activate();
