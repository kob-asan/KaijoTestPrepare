document.addEventListener("DOMContentLoaded", async () => {

    const container = document.getElementById("chapters");

    try{

        const response = await fetch("info.json");
        const data = await response.json();

        data.chapters.forEach(chapter=>{

            const card = document.createElement("div");

            card.className="chapter-card";

            card.innerHTML=`
                <h2>📘 ${chapter.name}</h2>
                <p>クリックして学習を開始</p>
            `;

            card.addEventListener("click",()=>{

                window.location.href =
`../../quiz/index.html?subject=mathA&chapter=${chapter.id}`;

            });

            container.appendChild(card);

        });

    }catch(error){

        container.innerHTML="<p>読み込みに失敗しました。</p>";

        console.error(error);

    }

});
