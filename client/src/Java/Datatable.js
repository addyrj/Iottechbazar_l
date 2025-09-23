import DataTables from "datatables.net";
import $ from "jquery";

export const userDataTable = () => {
    var table = new DataTables("#datatable", {
        paging: true,
        searching: true,
        lengthChange: false,
        ordering: true,
        info: true,
        autoWidth: false,
        responsive: true,
        destroy: true
    })
    // Extra step to do extra clean-up.
    return function () {
        table.destroy()
    }
}


