const currentDay = $('#currentDay');
// default array of planner
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
// current hour tracker
let currentHour = 0;
// re-render the whole view if the current hour is change
// this detect the moment when 59th turns to  00 minute  
let checkHour = setInterval(function () {
    if (moment().hours() != currentHour) {
        currentHour = moment().hours();
        updateTable();
    }
}, 1000);


// store the planner everytime button click
// take advantage of jquery event delegation feature, listen to button click only 
$('#plannerDisplay').on('click', '.btn', function (e) {
    // const element = e.target;
    // console.log(element.closest('tr'));
    storePlanner();
});

// get the planner from local storage,
// if there is no planner in local storage, return default planner which has empty inputs
function getLocalPlanner() {
    // if there is no array in local storage
    planner = JSON.parse(localStorage.getItem('Planner')) || planner;
}

// store the planner to local storage
function storePlanner() {
    // grab values of all textareas
    for (let hour of planner) {
        hour[1] = $(`#input-${hour[0]}`).val().trim();
    }
    // console.log(planner);
    localStorage.setItem('Planner', JSON.stringify(planner));
}

// update/render the planner view  
function updateTable() {
    let htmlTemplate = ``;
    let divTemplate = ``;
    // take advantage of ternary to do choose the right bg class for textarea
    for (let row of planner) {

        divTemplate += `
        <div class="row time-block my-1">
            <div class="col-2 hour text-end">
                <p class="h5">${row[0]<=12? row[0]:row[0]%12}:00 ${row[0]<12?'AM':'PM'}</p>
            </div>
            <textarea ${row[0]<currentHour? 'disabled':''} class="col-9 ${row[0]<currentHour?'past':row[0]==currentHour? 'present':'future'}" id="input-${row[0]}"  >${row[1].trim()}</textarea>
            <div class="saveBtn col-1" ${row[0]<currentHour? 'disabled':''}>
                <button ${row[0]<currentHour? 'disabled':''}  type='button' class='btn text-white text-center'><i class="fas fa-font-awesome fa-save"></i></button>
            </div>       
        </div>
        `;
        
    }

    $('#plannerDisplay').html(divTemplate);
}

function main() {
    // display current day
    currentDay.text(moment().format('dddd, MMMM Do'));
    // grab the current hour
    currentHour = moment().hours();
    // get local planer
    // console.log(currentHour);
    // grab the planner from local storage
    getLocalPlanner();
    // display the planner view
    updateTable();
}
main();