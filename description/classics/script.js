document.addEventListener("DOMContentLoaded", async () => {

    const container = document.getElementById("chapters");

    try {

        const response = await fetch("info.json");
        const data = await response.json();

        data.chapters.forEach(chapter => {

            const card = document.createElement("div");

            card.className = "chapter-card";

            card.innerHTML = `
                <h2>${chapter.name}</h2>
                <p>クリックして作品一覧を表示</p>
            `;

            card.addEventListener("click", () => {

    window.location.href =
`list/?category=${chapter.id}`;

});
            container.appendChild(card);

        });

    } catch (error) {

        container.innerHTML = "<p>読み込みに失敗しました。</p>";

        console.error(error);

    }

});