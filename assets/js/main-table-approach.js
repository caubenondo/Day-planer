const currentDay = $('#currentDay');
let planner = [
    [9, ''],
    [10, ''],
    [11, ''],
    [12, ''],
    [13, ''],
    [14, ''],
    [15, ''],
    [16, ''],
    [17, '']
];
let currentHour = 0;

let checkHour = setInterval(function () {
    if (moment().hours() != currentHour) {
        currentHour = moment().hours();
        updateTable();
    }
}, 1000);

$('#plannerDisplay').on('click', '.btn', function (e) {
    storePlanner();
});


function getLocalPlanner() {
    planner = JSON.parse(localStorage.getItem('Planner')) || planner;
}

function storePlanner() {
    for (let hour of planner) {
        hour[1] = $(`#input-${hour[0]}`).val().trim();
    }
    localStorage.setItem('Planner', JSON.stringify(planner));
}

function updateTable() {
    let htmlTemplate = ``
    for (let row of planner) {
        htmlTemplate += `
        <tr data-hour="${row[0]}">
            <td class="text-end" style="width: 15%"><p class='h3'>${row[0]<=12? row[0]:row[0]%12}:00 ${row[0]<12?'AM':'PM'}</p></td>
        <td>
            <textarea placeholder="To do" ${row[0]<currentHour? 'disabled':''}
            class="form-control ${row[0]<currentHour?'bg-secondary text-white':row[0]==currentHour? 'bg-danger text-white':'bg-success text-white'}" 
            id="input-${row[0]}" 
            rows="2">${row[1].trim()}</textarea>
        </td>
        <td style="width: 5%"><button ${row[0]<currentHour? 'disabled':''} type="button"  class="btn btn-info fa-2x"><i class="fas text-white fa-font-awesome fa-save"></i></button></td>
        </tr>        
        `;
    }
    $('#plannerDisplay').html(htmlTemplate);
}

function main() {
    currentDay.text(moment().format('dddd, MMMM Do'));
    currentHour = moment().hours();
    getLocalPlanner();
    updateTable();
}
main();