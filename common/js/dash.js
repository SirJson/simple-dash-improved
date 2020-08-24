
function renderConfig(config) {
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
}

(async () => {
    await main();
})();
