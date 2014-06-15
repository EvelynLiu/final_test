$(document).ready(function() {
  Parse.initialize('cBg30mmL0gugVy89T8VSVyRLE0swECDDg5ccJ46N','xJoUF67t6m6DneUpQna1HKOnCnGm29dUWuifPCrg');
})

function call (id){
  alert(0);
  window.scrollTo(0,0);
  // To support pagination.
  var Farmer = Parse.Object.extend("Farmer");
  var Product = Parse.Object.extend("Product");
  var query = new Parse.Query(Farmer);
  var queryP = new Parse.Query(Product);
  //================LIST!!!
  var list = "hihi";
  //================
  query.equalTo("objectId", id);
  query.find({
    success: function(results) {
      alert(1);
      //$('#content').html("");
      var objList = results.map(function (e){ return e.toJSON() });
      console.log(objList);
      queryP.descending("createdAt");
      queryP.equalTo("Farmer",e.objectId);
      queryP.find({
        success: function(output){
          var productList = output.map(function (e){ return e.toJSON() });
          console.log(productList);
          productList.forEach(function (e){
            alert(2);
            list = list+e.Prod_name+" ";
          });
        }
      });
      var html = '<a href="farmer.html" onClick=" "><div class="about"><img src="'+e.Name+'"></img><p class="name">'+e.Name+'</p><p>'+list+'</p></div></a>';
      $('.content').append(html);
    }
  });
  event.preventDefault();
}
