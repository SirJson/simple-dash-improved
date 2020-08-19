async function configData() {
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
    }
    return config;
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

function fail(why) {
    const text = "Error: " + why;
    console.error(text);
    document.title = text;
}