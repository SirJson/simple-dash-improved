
function renderConfig(config) {
    document.title = config.title;

    let itemlistHTML = "";
    for (let i = 0; i < config.items.length; i++) {
        let item = config.items[i];
        itemlistHTML +=
            '<a href="' +
            item.link +
            '" title="' +
            item.alt +
            '"><i class="' +
            item.icon +
            ' fa-fw"></i></a>';
    }
    document.getElementById("itemlist").innerHTML = itemlistHTML;
}

async function main() {
    const config = await configData();

    renderConfig(config);


    //TODO: Maybe we can do better?
    let resizeTimer;
    window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            addTriangleTo(document.body);
        }, 400);
    });

    addTriangleTo(document.body);
}

(async () => {
    await main();
})();
