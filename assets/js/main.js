const currentDay = $('#currentDay');
// default array of planner
let planner = [
    [9,''],[10,''],[11,'test'],[12,''],[13,''],[14,''],[15,''],[16,''],[17,'']
];
let currentHour = 0;
let checkHour = setInterval(function () {
    if(moment().hours()!=currentHour){
        currentHour = moment().hours();
        updateTable();
    }
}, 1000);

function main(){    
    // display current day
    currentDay.text(moment().format('dddd, MMMM Do'));
    currentHour = moment().hours();
    // get local planer
    // console.log(currentHour);
    getLocalPlanner();
    updateTable();
}

$('#plannerDisplay').on('click','.btn', function(e){
    // const element = e.target;
    // console.log(element.closest('tr'));
    storePlanner();
});



function getLocalPlanner(){
    // if there is no array in local storage
    planner = JSON.parse(localStorage.getItem('Planner')) || planner;
}
function storePlanner(){
    for (let i = 9;i<=17;i++){
        planner[i-9][1] = $(`#input-${i}`).val().trim();
    }
    // console.log(planner);
    localStorage.setItem('Planner',JSON.stringify(planner));
}

function updateTable(){
    let htmlTemplate = ``
    
    for (let row of planner){
        htmlTemplate += `
        <tr data-hour="${row[0]}">
            <td class="text-end"><h3>${row[0]<=12? row[0]:row[0]%12}:00 ${row[0]<12?'AM':'PM'}</h3></td>
        <td>
            <textarea placeholder="To do" class="form-control ${row[0]<currentHour?'bg-secondary text-white':row[0]==currentHour? 'bg-danger text-white':'bg-success text-white'}" 
                id="input-${row[0]}" rows="2">${row[1].trim()}</textarea>
        <td><button type="button"  class="btn btn-info fa-2x"><i class="fas text-white fa-font-awesome fa-save"></i></button></td>
        </tr>        
        `;
    }

    $('#plannerDisplay').html(htmlTemplate);
}

main();
