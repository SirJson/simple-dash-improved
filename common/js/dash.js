// @ts-nocheck

function fail(why) {
    const error_text = "Error: " + why;
    console.error(why);
    document.title = why;
}

function addTriangleTo(target) {
    let dimensions = target.getClientRects()[0];
    let pattern = Trianglify({
        width: dimensions.width,
        height: dimensions.height,
    });

    target.style["background-image"] = "url(" + pattern.png() + ")";
    target.style["background-size"] = "cover";
}

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
    const configJson = window.localStorage.getItem("config");
    let config = null;

    if (!configJson) {
        const setupFile = await fetch("config.json");
        if (!setupFile.ok) {
            fail(
                `Failed to load setup file (${setupFile.status}): ${setupFile.statusText}`,
            );
            return;
        }
        const setupConfig = await setupFile.json();
        window.localStorage.setItem("config", JSON.stringify(setupConfig));
        config = setupConfig;
        console.info("No local config found! Using setup config");
    } else {
        console.info("Loading config from local storage");
        config = JSON.parse(configJson);
        console.log(config);
    }

    renderConfig(config);

    //TODO: Maybe we can do better?
    let resizeTimer;
    window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            addTriangleTo(homepage);
        }, 400);
    });

    addTriangleTo(homepage);
}

(async () => {
    await main();
})();
