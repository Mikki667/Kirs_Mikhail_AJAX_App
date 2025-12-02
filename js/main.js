(() => {
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const loader = document.querySelector("#loader");
  const statusMessage = document.querySelector("#status-message");

  function loadInfoBoxes() {
    if (loader) {
      loader.classList.toggle("hidden");
    }

    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then(response => response.json())
      .then(infoBoxes => {
        console.log(infoBoxes);

        infoBoxes.forEach((infoBox, index) => {
          const selected = document.querySelector(`#hotspot-${index + 1}`);
          if (!selected) {
            return;
          }

          selected.innerHTML = "";

          const titleElement = document.createElement("h2");
          titleElement.textContent = infoBox.heading;

          const textElement = document.createElement("p");
          textElement.textContent = infoBox.description;

          selected.appendChild(titleElement);
          selected.appendChild(textElement);
        });

        if (loader) {
          loader.classList.toggle("hidden");
        }
      })
      .catch(error => {
        console.log(error);
        if (loader) {
          loader.classList.toggle("hidden");
        }
        if (statusMessage) {
          statusMessage.textContent = "I couldn’t load the infobox data from the server.";
        }
      });
  }
  
  function loadMaterialInfo() {
    if (loader) {
      loader.classList.toggle("hidden");
    }

    fetch("https://swiftpixel.com/earbud/api/materials")
      .then(response => response.json())
      .then(materialListData => {
        console.log(materialListData);

        materialList.innerHTML = "";

        materialListData.forEach(material => {
          const clone = materialTemplate.content.cloneNode(true);

          const materialHeading = clone.querySelector(".material-heading");
          const materialDescription = clone.querySelector(".material-description");

          materialHeading.textContent = material.heading;
          materialDescription.textContent = material.description;

          materialList.appendChild(clone);
        });

        if (loader) {
          loader.classList.toggle("hidden");
        }
      })
      .catch(error => {
        console.log(error);
        if (loader) {
          loader.classList.toggle("hidden");
        }
        if (statusMessage) {
          statusMessage.textContent = "I couldn’t load the materials from the server.";
        }
      });
  }

  function showInfo() {
    const selected = document.querySelector(`#${this.slot}`);
    if (!selected) {
      return;
    }
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    const selected = document.querySelector(`#${this.slot}`);
    if (!selected) {
      return;
    }
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  hotspots.forEach(hotspot => {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

  loadInfoBoxes();
  loadMaterialInfo();
})();