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