document.addEventListener("DOMContentLoaded", async () => {

    const container = document.getElementById("works");

    const title = document.getElementById("title");

    const params = new URLSearchParams(window.location.search);

    const category = params.get("category");

    if (!category) {

        container.innerHTML = "<p>カテゴリーが指定されていません。</p>";

        return;

    }

    try {

        const response = await fetch(`../${category}/list.json`);

        const data = await response.json();

        title.textContent = data.name;

        data.works.forEach(work => {

            const card = document.createElement("div");

            card.className = "work-card";

            card.innerHTML = `
                <h2>📖 ${work.name}</h2>
                <p>クリックして作品を見る</p>
            `;

            card.addEventListener("click", () => {

                window.location.href =
`../viewer/?category=${category}&id=${work.id}`;

            });

            container.appendChild(card);

        });

    } catch (error) {

        container.innerHTML = "<p>読み込みに失敗しました。</p>";

        console.error(error);

    }

});