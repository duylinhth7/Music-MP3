export const filterStatus = (query) => {
    const filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Ngưng hoạt động",
            status: "inactive",
            class: ""
        }
    ];
    

    //Tìm ra obj có status tương ứng để add vào class active
    if(query.status){
        const index = filterStatus.findIndex(item => item.status == query.status);
        filterStatus[index].class="active";
    } else {
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class="active";
    };

    return filterStatus;
}