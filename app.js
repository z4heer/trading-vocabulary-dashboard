console.log("JS Loaded");

function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}

fetch("/trading-vocabulary-dashboard/data/vocabulary.json")
    .then(res => res.json())
    .then(data => {

        const dashboard = document.getElementById("dashboard");
        const id = getQueryParam("id");

        // DASHBOARD
        if (dashboard) {
            data.categories.forEach(item => {
                const card = document.createElement("div");
                card.className = "card";

                card.innerHTML = `
                    <img src="assests/svg/${item.svg}" alt="${item.title}">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                `;

                card.onclick = () => {
                    window.location.href = `pages/detail.html?id=${item.id}`;
                };

                dashboard.appendChild(card);
            });
        }

        // DETAIL PAGE
        if (id) {
            const item = data.categories.find(c => c.id === id);
            if (!item) return;

            document.getElementById("title").innerText = item.title;
            document.getElementById("description").innerText = item.description;
            //document.getElementById("image").src = `../assests/svg/${item.svg}`;
            const container = document.getElementById("svgContainer");

            fetch(`../assests/svg/${item.svg}`)
                .then(res => res.text())
                .then(svg => {
                    container.innerHTML = svg;

                    const svgEl = container.querySelector("svg");
                    if (svgEl) {
                        svgEl.setAttribute("width", "100%");
                        svgEl.setAttribute("height", "100%");
                        svgEl.style.maxWidth = "100%";
                    }
                });

        }
    })
    .catch(err => console.error("Fetch error:", err));
