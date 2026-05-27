export function renderCards(
  list,
  container
){

  container.innerHTML = "";

  for(const item of list){

    const card =
      document.createElement("div");

    card.className =
      "card";

    card.innerHTML = `

      ${
        item.image
        ? `
          <img
            src="${item.image}"
            class="thumb"
            loading="lazy"
          />
        `
        : ""
      }

      <div class="name">
        ${item.name}
      </div>
    `;

    container.appendChild(card);
  }
}
