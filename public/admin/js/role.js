//UPDATE PERMISSIONS
const tablePermission = document.querySelector("[table-permissions]")
if (tablePermission) {
    const buttonSubmitPermission = document.querySelector("[button-patch-permissions]");
    buttonSubmitPermission.addEventListener("click", () => {
        let permissions = [];
        const rows = tablePermission.querySelectorAll("[data-name]");
        rows.forEach((item, index) => {
            const name = item.getAttribute("data-name");
            const inputs = item.querySelectorAll("input");
            if (name === "id-permissions") {
                inputs.forEach((item, index) => {
                    const id = item.getAttribute("value");
                    permissions.push({
                        id: id,
                        permissions: []
                    })
                })
            } else {
                inputs.forEach((item, index) => {
                    const checked = item.checked;
                    if (checked) {
                        permissions[index].permissions.push(name);
                    }
                })
            }
        })

        if (permissions.length > 0) {
            const formPatchPermisson = document.querySelector("[form-patch-permissions]");
            if (formPatchPermisson) {
                const inputPatchPermissions = formPatchPermisson.querySelector("[input-patch-permissions]");
                inputPatchPermissions.setAttribute("value", JSON.stringify(permissions));
                formPatchPermisson.submit();
            }
        }
    })
}
//END UPDATE PERMISSIONS

//VIEW CHECKED PERMISSONS
const dataRecord = document.querySelector("[data-record]");
if (dataRecord) {
    const record = JSON.parse(dataRecord.getAttribute("data-record"));
    const tablePermission = document.querySelector("[table-permissions]");
    record.forEach((item, index)=> {
        item.permissions.forEach((item) => {
            const rows = tablePermission.querySelector(`[data-name=${item}]`);
            const inputs = rows.querySelectorAll(`input`)[index];
            inputs.checked = true;
        })
    })

}
//END VIEW CHECKED PERMISSONS
