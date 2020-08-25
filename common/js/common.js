const ALLBGMODES = [
    "saturation",
    "difference",
    "hue",
    "multiply",
    "luminosity",
    "color",
    "screen",
    "exclution",
    "hard-light",
    "soft-light"
];

const BGPATTERNS = [
    "gradiant",
    "geometry"
]

const CURRENT_SCHEMA_VERSION = 4;

const SCHEMA_UPDATES = [
    (cfg) => {},
    (cfg) => {delete cfg.title; cfg.schemaVersion = 2;},
    (cfg) => {cfg.blendmodes = ALLBGMODES; cfg.schemaVersion = 3;},
    (cfg) => {cfg.background = "gradiant"; cfg.schemaVersion = 4;},
]

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
        while(config.schemaVersion < CURRENT_SCHEMA_VERSION) {
            const currentVer = config.schemaVersion;
            const nextVer = currentVer + 1;
            console.info(`Upgrading schema from version ${currentVer} to version ${nextVer}`);
            SCHEMA_UPDATES[currentVer](config);
            console.info(`Current schema version is ${config.schemaVersion}`);
            window.localStorage.setItem("config", JSON.stringify(config));

        }
    }
    return config;
}

function fail(why) {
    const text = "Error: " + why;
    console.error(text);
    document.title = text;
}