document.addEventListener("DOMContentLoaded", async () => {

    const subjectsContainer = document.getElementById("subjects");

    try {

        const response = await fetch("data/subjects.json");
        const subjects = await response.json();

        subjects.forEach(subject => {

            const card = document.createElement("div");
            card.className = "subject-card";

            card.innerHTML = `
                <div class="icon">${subject.icon}</div>
                <h2>${subject.name}</h2>
                <p>${subject.description}</p>
            `;

            card.addEventListener("click", () => {
                window.location.href = subject.path;
            });

            subjectsContainer.appendChild(card);

        });

    } catch (error) {

        subjectsContainer.innerHTML = `
            <p>科目データの読み込みに失敗しました。</p>
        `;

        console.error(error);

    }
});
// 📖 まとめ・解説の追加表示
const descriptionsContainer = document.getElementById("descriptions");

function createCard(container, item) {
    const card = document.createElement("div");
    card.className = "subject-card";

    card.innerHTML = `
        <div class="icon">${item.icon}</div>
        <h2>${item.name}</h2>
        <p>${item.description}</p>
    `;

    card.addEventListener("click", () => {
        window.location.href = item.path;
    });

    container.appendChild(card);
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const descRes = await fetch("data/descriptions.json");
        const descriptions = await descRes.json();

        descriptions.forEach(item => createCard(descriptionsContainer, item));

    } catch (err) {
        console.error(err);
    }
});