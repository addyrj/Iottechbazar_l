import DataTables from "datatables.net";
import buttons from "datatables.net-buttons"

import $ from "jquery";

// export const userListDatatables = () => {
//     var table = new DataTables("#datatable", {
//         buttons: [
//             'copy', 'excel', 'pdf'
//         ],
//         layout: {
//             topStart: 'buttons'
//         },
//         paging: true,

//     })
//     // Extra step to do extra clean-up.
//     return function () {
//         table.destroy()
//     }
// }

export const userListDatatables = () => {
    let table = new DataTables("#datatable", {
        paging: true,
        searching: true,
        lengthChange: true,
        ordering: true,
        info: true,
        responsive: true,
        destroy: true,
    });
    return function () {
        table.destroy()
    }
}



