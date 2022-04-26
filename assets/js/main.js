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
$('#plannerDisplay').on('click', '.storeLocal', function (e) {
    const element = e.target;
    storePlanner(parseInt(element.dataset.button));
});

// get the planner from local storage,
// if there is no planner in local storage, return default planner which has empty inputs
function getLocalPlanner() {
    // if there is no array in local storage
    planner = JSON.parse(localStorage.getItem('Planner')) || planner;
}

// store the planner to local storage
function storePlanner(number) {
    // grab value of textareas
   
    let target =  planner.filter(a=>a[0]==number);
    planner[(number-9)][1] = $(`#input-${number}`).val().trim();

    localStorage.setItem('Planner', JSON.stringify(planner));
}

// update/render the planner view  
function updateTable() {
   
    let divTemplate = ``;
    // take advantage of ternary to do choose the right bg class for textarea
    for (let row of planner) {

        divTemplate += `
        <div class="row time-block my-4">
            <div class="col-2 hour text-end">
                <p class="h4">${row[0]<=12? row[0]:row[0]%12}:00 ${row[0]<12?'AM':'PM'}</p>
            </div>
            <textarea id="input-${row[0]}" class="col-8 col-lg-9 text-dark ${row[0]<currentHour?'past':row[0]==currentHour? 'present':'future'}" id="input-${row[0]}"  >${row[1].trim()}</textarea>
            <div class="saveBtn col-2 col-lg-1 px-0 " >
                <button  type='button' data-button="${row[0]}" class='btn storeLocal text-white text-center' style="font-size:2rem;"><i data-button="${row[0]}" class="fas fa-font-awesome fa-save"></i></button>
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