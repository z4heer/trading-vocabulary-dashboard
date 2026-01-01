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

            fetch(`../asset/svg/${item.svg}`)
                .then(res => res.text())
                .then(svgText => {
                    container.innerHTML = svgText;

                    const svg = container.querySelector("svg");
                    if (!svg) return;

                    // Force SVG to render fully
                    svg.removeAttribute("width");
                    svg.removeAttribute("height");

                    // Give browser a tick to render, then calculate bounds
                    requestAnimationFrame(() => {
                        const bbox = svg.getBBox();

                        svg.setAttribute(
                            "viewBox",
                            `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`
                        );

                        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
                    });
                });

        }
    })
    .catch(err => console.error("Fetch error:", err));
