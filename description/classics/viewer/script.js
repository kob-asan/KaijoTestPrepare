document.addEventListener("DOMContentLoaded", async () => {

    const title = document.getElementById("title");
    const author = document.getElementById("author");

    const original = document.getElementById("original");
    const translation = document.getElementById("translation");
    const words = document.getElementById("words");
    const points = document.getElementById("points");

    const params = new URLSearchParams(window.location.search);

    const category = params.get("category");
    const id = params.get("id");

    if (!category || !id) {

        document.querySelector("main").innerHTML =
            "<p>作品が指定されていません。</p>";

        return;

    }

    try {

        const response = await fetch(`../${category}/${id}/data.json`);

        const data = await response.json();

        title.textContent = data.title;
        author.textContent = `${data.author}『${data.book}』`;

        // 本文
        original.innerHTML = "";

        data.original.forEach(line => {

            const p = document.createElement("p");

            p.textContent = line;

            original.appendChild(p);

        });

        // 現代語訳
        translation.innerHTML = "";

        data.translation.forEach(line => {

            const p = document.createElement("p");

            p.textContent = line;

            translation.appendChild(p);

        });

        // 重要語句
        words.innerHTML = "";

        data.words.forEach(word => {

            const div = document.createElement("div");

            div.className = "word";

            div.innerHTML = `
                <span class="left">${word.original}</span>
                <span>${word.modern}</span>
            `;

            words.appendChild(div);

        });

        

        // テストポイント
        points.innerHTML = "";

        data.points.forEach(point => {

            const div = document.createElement("div");

            div.className = "point";

            div.textContent = point;

            points.appendChild(div);

        });

        const grammar = document.getElementById("grammar");

// 品詞・文法
grammar.innerHTML = "";

data.grammar.forEach(item => {

    const div = document.createElement("div");

    div.className = "point";

    div.innerHTML = `
    <div class="grammar-title">${item.text}</div>
    <div class="grammar-description">${item.description}</div>
`;

    grammar.appendChild(div);

});

    } catch (error) {

        document.querySelector("main").innerHTML =
            "<p>読み込みに失敗しました。</p>";

        console.error(error);

    }

});