const currentDay = $('#currentDay');
let planner = [
    [9,''],[10,''],[11,''],[12,''],[13,''],[14,''],[15,''],[16,''],[17,'']
];
let currentHour = '';
let checkHour = setInterval(function () {
    if(moment().format('h')!=currentHour){
        currentHour = moment().format('h');
        updateTable();
    }
}, 1000);

function main(){    
    // display current day
    currentDay.text(moment().format('dddd, MMMM Do'));
    currentHour = moment().format('h');
    $('.testing').text(moment().format('h'));
    const hour = moment().format('h');
    console.log(hour);
    // get local planer
    console.log(currentHour);
    getLocalPlanner();
    updateTable();
    
}

function getLocalPlanner(){
    planner = JSON.parse(localStorage.getItem('Planer')) || planner;
}
function storePlanner(){
    localStorage.setItem('Planer',localStorage.setItem('Planer',JSON.stringify(planner)));
}

function updateTable(){
    let htmlTemplate = ``
    
    for (let row of planner){
        htmlTemplate += `
        <tr data-hour="${row[0]}">
            <td class="text-end"><h3>${row[0]<=12? row[0]:row[0]%12}:00 ${row[0]<12?'AM':'PM'}</h3></td>
        <td><textarea class="form-control ${row[0]<parseInt(currentHour)?'bg-secondary':(row[0]==parseInt(currentHour)? 'bg-primary':'')}" 
            id="input-${row[0]}" rows="2">${row[1]}
            </textarea>
        <td><button class="btn btn-success">Save</button></td>
        </tr>        
        `;
    }
    $('#plannerDisplay').html(htmlTemplate);
}

main();




/* 
<tr data-hour="10">
    <td class="text-end">
              <h3>12:00</h3>
    </td>
    <td><textarea class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
    <td><button class="btn btn-success">edit</button></td>
</tr> 
*/