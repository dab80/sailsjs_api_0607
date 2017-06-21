(function() {
  'use strict';

  //get the pop-up type from storage
  let pop_up_type = localStorage.getItem('pop_up_type');

  //-- declare dialog vars
  let stock_id = 0;
  let update_url = "";

  $(document).ready(function() {

    //-- Check for pop up type {update|add}
    if (pop_up_type === 'update') {
      // console.log("in the update");
      stock_id = parseInt(localStorage.getItem('stock_id'));
      update_url = "http://localhost:1337/stocks/" + stock_id;
      $('#main_heading').html('Update Company Stock Data');
      // console.log('url = ' + update_url);
      let my_var = $.get(update_url, function(data) {

        //-- set the current values for the selected company
        $('#company').val(data.co_name);
        $('#symbol').val(data.symbol);
        $('#52_week_low').val(data.wk_52_lo);
        $('#52_week_high').val(data.wk_52_hi);
        $('#avg_volume').val(data.avg_vol);
        $('#market_cap').val(data.mkt_cap);
        $('#pe_ratio').val(data.pe_ratio);
        $('#eps').val(data.eps);
      }); //-- end of get requet

      my_var.done(function() {
        alert("You may submit multiple updates. \n \nWhen finished, close this dialog with upper left red x.");
        return;
      });

    } else { //-- therefore, this is an add
      update_url = "http://localhost:1337/stocks";
      alert("You may submit multiple and unique additions. \n \nWhen finished, close this dialog with upper left red x.");
    }
  });//-- end of $(document).ready(function()

  //-- submit button was selected
  $('#submit_button').click(function() {
    // console.log("Submit button clicked");

    //check for pop-up type
    if (pop_up_type === 'add') {
      // console.log("Add button selected...");

      //-- send the post request
      $.post(update_url,
        $('#form_id').serialize(),
        function(data, status) {
          alert("Status: " + status + "\n\nYou may submit multiple and unique additions. \n \nWhen finished, close this dialog with upper left red x.");
        });

    } else { //if not add, then it's an update pop-up

      //-- send the PUT request
      $.ajax({
        url: update_url,
        type: 'PUT',
        data: $('#form_id').serialize(),
        success: function(result) {
          console.log("The selected company has been updated!");
        }
      });
    } //-- end of submit button click

    //--reset the inputs
    $('#company').val("");
    $('#symbol').val("");
    $('#52_week_low').val("");
    $('#52_week_high').val("");
    $('#avg_volume').val("");
    $('#market_cap').val("");
    $('#pe_ratio').val("");
    $('#eps').val("");

    //-- loose the focus on the button
    $('#submit_button').blur();

  });
})();
