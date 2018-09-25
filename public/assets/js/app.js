console.log('connected front-end js');
$(document).ready(function () {
  $('select').formSelect();
});

$('#submit').on('click', function (event) {
  event.preventDefault();
  var newProduct = {
    product_name: $('#product_name').val().trim(),
    description: $('#description').val().trim(),
    imgURL: $('#imgURL').val().trim(),
    department: $('#department').val().trim(),
    price: $('#price').val().trim(),
    quantity: $('#quantity').val().trim()
  }
 if (newProduct.product_name.val()!=="" && newProduct.description.val()!=="" && imgURL.val()!=="" && newProduct.department.val()!==""){
   $.post('/api/post', newProduct, function(){
     location.replace('/')
   })
  }
   else{
     
   }

})
$(document).ready(function(){
    // This button will increment the value
    $('[data-quantity="plus"]').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('data-field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
            $('input[name='+fieldName+']').val(currentVal + 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(0);
        }
    });
    // This button will decrement the value till 0
    $('[data-quantity="minus"]').click(function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('data-field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 0) {
            // Decrement one
            $('input[name='+fieldName+']').val(currentVal - 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(0);
        }
    });
    // Tooltip code for add to cart
    $('.tooltipped').tooltip();
    
    // Jquery fort the modal
     $('.modal').modal();

     $('#closeBtn').on('click', function(){
        $('.modal').modal('close');
     })
    
   

});
