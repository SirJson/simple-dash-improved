async function editMain(editor) {
    const config = await configData();
    editor.setValue(JSON.stringify(config,null,4));
    document.querySelector("#savebnt").addEventListener("click",(ev) => onSave(editor));
    document.querySelector("#cancelbnt").addEventListener("click",(ev) => onCancel());
}

function onSave(editor) {
    console.info("New Config saved!",editor.getValue());
    window.localStorage.setItem("config", editor.getValue());
    window.location.replace("index.html");
}

function onCancel() {
    window.location.replace("index.html");
}
