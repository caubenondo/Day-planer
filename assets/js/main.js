const currentDay = $('#currentDay');
// default array of planner
let planner = [
    [9,''],[10,''],[11,'test'],[12,''],[13,''],[14,''],[15,''],[16,''],[17,'']
];
// current hour tracker
let currentHour = 0;
// re-render the whole view if the current hour is change
// this detect the moment when 59th turns to  00 minute  
let checkHour = setInterval(function () {
    if(moment().hours()!=currentHour){
        currentHour = moment().hours();
        updateTable();
    }
}, 1000);


// store the planner everytime button click
// take advantage of jquery event delegation feature, listen to button click only 
$('#plannerDisplay').on('click','.btn', function(e){
    // const element = e.target;
    // console.log(element.closest('tr'));
    storePlanner();
});

// get the planner from local storage,
// if there is no planner in local storage, return default planner which has empty inputs
function getLocalPlanner(){
    // if there is no array in local storage
    planner = JSON.parse(localStorage.getItem('Planner')) || planner;
}

// store the planner to local storage
function storePlanner(){
    // grab values of all textareas
    for (let hour of planner){
        hour[1] = $(`#input-${hour[0]}`).val().trim();
    }
    // console.log(planner);
    localStorage.setItem('Planner',JSON.stringify(planner));
}

// update/render the planner view  
function updateTable(){
    let htmlTemplate = ``
    // take advantage of ternary to do choose the right bg class for textarea
    for (let row of planner){

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


function main(){    
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
