function widget() {
  //назначаев ивент листенер каждо
  const slide = document.querySelector(".slide");
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const img = document.getElementById("img");
  const infoBlock = document.querySelector(".infoBlock");
  const animationDuration = 400;
  const toggle = document.getElementById("toggle");

  let btnObject = document.querySelectorAll(".btn");
  const btnArray = Object.values(btnObject);

  btnArray.map(it =>
    it.addEventListener("click", function() {
      ajaxCall(btnArray.indexOf(it));
      console.log(btnArray.indexOf(it));
    })
  );

  // AJAJ
  const adURL =
    "https://my-json-server.typicode.com/IlyaLytvynov/ads-box-server/ads";

  function ajaxCall(btn) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", adURL);

    xhr.onload = () => {
      let mainData = JSON.parse(xhr.responseText);
      let numberOfProducts = mainData.length;
      render(btn, mainData, numberOfProducts);
    };
    xhr.send();
  }

  //---------------------------------------------------------------------------
  let currentProduct = 0;
  function render(btn, mainData, numberOfProducts) {
    //button logic
    // сделай через  switch(btn)
    if (btn === 0) {
      currentProduct = 0;
    } else if (btn === 3) {
      currentProduct = numberOfProducts - 1;
    } else if (btn === 1) {
      currentProduct -= 1;
    } else if (btn === 2) {
      currentProduct += 1;
    }

    if (currentProduct === numberOfProducts) {
      currentProduct = 0;
    } else if (currentProduct < 0) {
      currentProduct = numberOfProducts - 1;
    }
    //..................................................................................
    slide.classList.add("slided");

    title.innerText = mainData[currentProduct].title;
    description.innerText = mainData[currentProduct].description;

    //.................in order to switch images according to animation...............
    setTimeout(function() {
      slide.classList.remove("slided");
      img.src = mainData[currentProduct].img;
    }, animationDuration);
    //.............................................................................................
  }

  ajaxCall(0);

  //Toggle button
  toggle.addEventListener("click", function() {
    infoBlock.classList.toggle("moved");
  });
}

export { widget };
