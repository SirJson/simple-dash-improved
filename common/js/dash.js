

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
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

async function main() {
    const config = await configData();

    if(BGPATTERNS.indexOf(config.background) < 0) {
        console.error("Unknown background value. Fallback to 'gradiant'",config.background);
        config.background = "gradiant";
    }

    document.body.classList.add(config.blendmodes[getRandomInt(0, config.blendmodes.length)], `${config.background}-background`);
    const searchbar = document.getElementById("gsearch");
    searchbar.focus();
    searchbar.select();
    renderConfig(config);
}

(async () => {
    await main();
})();
