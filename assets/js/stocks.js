(function() {
  // $(function() {
  //graphical items
  let del_button = $("#del_button");
  let add_button = $("#add_button");
  let put_button = $("#put_button");

  //storage items
  let body = $("body");
  var search_url = "";
  var pop_up_window;
  var intervalID;

  //jQuery equivelent to window.onload = function{}
  $(document).ready(function() {

    display_table();

  });

  function display_table() {
    $('#myTable').hide();
    $('#response_div').hide();

    //remove all but the header row fro mthe table
    $('#myTable tr').has('td').remove();

    let my_var = $.get("http://localhost:1337/stocks", function(data) {
      $.each(data, function(index, value) {

        console.log(value.symbol);

        $('#myTable').append('<tr><td><input type="radio" name="radio-1" value="' + value.id + '"><td>' +
          value.co_name + '</td><td>' + value.symbol + '</td><td>' +
          value.wk_52_lo + '</td><td>' + value.wk_52_hi + '</td><td>' + value.avg_vol + '</td><td>' +
          value.mkt_cap + '</td> <td>' + value.pe_ratio + '</td><td>' + value.eps + '</td></tr>');

      }) //1st each
    });

    my_var.done(function() {
      show_table();
    });

  } //end of getQuestion

  function show_table() {
    $('#myTable').show();
    $('#response_div').show();
  }

  //-- this function returns the radio button id for delete and update
  function get_rb_id() {

    if ($('input[name=radio-1]:checked').val() === undefined) {
      // alert("You must first select a row.");
      $.msgBox({
        title: "Invalid!",
        content: "You must select a stock first!",
        type: "error",
        showButtons: false,
        opacity: 0.9,
        autoClose: true
      });
      return 0;
    } else {
      return $('input[name=radio-1]:checked').val();
    }
  } //end of get radio button

  //This function is called when the pop_up window is closed
  function checkWindow() {
    if (pop_up_window && pop_up_window.closed) {
      window.clearInterval(intervalID);
      console.log(("pop_up closed"));
      display_table();
    }
  } //-- end of check window


  function process_button_click(button_name) {

    let url_str = "";
    switch (button_name) {
      case 'add':
        {
          // set pop-up type to add & open the popup window
          localStorage.setItem('pop_up_type', 'add');
          open_pop_up();

          break;
        }
      case 'delete':
        {
          //get the button id
          let id = get_rb_id();
          console.log("Rabio Button = " + id);
          if (id > 0) {
            console.log("In the delete if.");

            $.ajax({
              url: 'http://localhost:1337/stocks?id=' + id,
              type: 'DELETE',
              success: function(result) {
                // Do something with the result
                console.log("The selected company has been deleted!");
                $.msgBox({
                  title: "Success!",
                  content: "The selected company has been deleted!",
                  type: "info",
                  showButtons: false,
                  opacity: 0.9,
                  autoClose: true
                });
                display_table();
              }
            }); //end of ajax call
          } //end of rb_id != 0
          break;
        } //end of delete
      case 'update':
        {
          //get the selected row
          let id = get_rb_id();
          console.log("Rabio Button = " + id);

          //if a row was selected, open the pop-up with data
          if (id > 0) {
            localStorage.setItem('pop_up_type', 'update');
            localStorage.setItem('stock_id', id);
            open_pop_up();
          }
        }
        break;
      default:
        //should not get here
    }
  }//-- end of process_button_click

  function open_pop_up() {
    // open the popup window
    pop_up_window = window.open("pop_up.ejs", "popupWindow", "width=780, height=600, scrollbars=yes, titlebar=no, toolbar=no, location=no");

    // this is a listener for when the pop-up window closes
    intervalID = window.setInterval(checkWindow, 500);

  }//-- end of open_pop_up

  //-- process delete button click
  del_button.click(function() {
    // console.log("Delete button clicked");
    process_button_click('delete');

    // loose the button focus
    del_button.blur();

  });//-- end of del_button click

  //-- process add button click
  add_button.click(function() {
    // console.log("Add button clicked");
    process_button_click('add');

    // loose the button focus
    add_button.blur();

  });//-- end of add_button click

  //-- process update button click
  put_button.click(function() {
    // console.log("Update/Put button clicked");
    process_button_click('update');

    // loose the button focus
    put_button.blur();

  });//-- end of put_button click

})();
