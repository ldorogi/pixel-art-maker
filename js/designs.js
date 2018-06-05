const WHITE_BACKGROUND = '#ffffff';
let gridHeight = 1;
let gridWidth = 1;
let colorCode = '#000000';

$(document).ready(function () {
  $('form').submit(function( event ) {
    // prevent default behaviour of form submit event
    event.preventDefault();

    //get the grid size from user input
    gridHeight = $('#input_height').val();
    gridWidth = $('#input_width').val();

    //check if the input values are in the range (<= 50); if yes draw the canvas otherwise ask for new input
    (gridHeight <= 50 && gridWidth <=50) ? makeGrid() : askForNewInput();

    //change the mouse cursor to hand style to tell users that the cell is clickable
    $('#pixel_canvas:has(td)').mouseover(function(e) {
      $(this).css('cursor', 'pointer');
      });

    //fill the clicked cell (the closest one) with the choosen color
    $('#pixel_canvas:has(td)').click(function(e) {
      let colorCode = $('#colorPicker').val();
      let clickedCell= $(e.target).closest('td');
      clickedCell.css('background', colorCode);
      });

    //on doublecklick fill the clicked cell (the closest one) with base white color (e.g. delete the color)
    $('#pixel_canvas:has(td)').dblclick(function(e) {
      let clickedCell= $(e.target).closest('td');
      clickedCell.css('background', WHITE_BACKGROUND);
      });

  });

})


// ask for new input because of too high canvas size values
function askForNewInput(){
  // inform user about wrong input
  alert("Both the height and width should be less or equal to 50!\nPlease enter new valid values.");

  // initialize input values
  $('#input_height').val(1);
  $('#input_width').val(1);

  // delet previous canvas if there is any
  deleteCanvas();
}


// draw the canvas
function makeGrid() {
  let table = document.getElementById('pixel_canvas');

  // delete previous canvas
  deleteCanvas();

  for (var rowCount = 0; rowCount < gridHeight; rowCount++) {

    // table row creation
    let row = table.insertRow(rowCount);

    // insert cells
    for (var cellCount = 0; cellCount < gridWidth; cellCount++) {
      row.insertCell(cellCount);
    }

  }

}

// delete the canvas
function deleteCanvas(){
  let Parent = document.getElementById('pixel_canvas');

  while(Parent.hasChildNodes()) {
    Parent.removeChild(Parent.firstChild);
  }

}
