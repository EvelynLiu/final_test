$(document).ready(function() {
  Parse.initialize('cBg30mmL0gugVy89T8VSVyRLE0swECDDg5ccJ46N','xJoUF67t6m6DneUpQna1HKOnCnGm29dUWuifPCrg');
})

function call (id){
  alert(0);
  //window.scrollTo(0,0);
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
      //$('.content').html("");
      var objList = results.map(function (e){ return e.toJSON() });
      console.log(objList);
      queryP.descending("createdAt");
      queryP.equalTo("Farmer",e.objectId);
      queryP.find({
        success: function(output){
          var productList = output.map(function (e){ return e.toJSON() });
          console.log(productList);
          productList.forEach(function (e){
            list = e.Prod_name;
            var pro = '<div class="product"><img src="'+e.Prod_Pic.url'"></img><h3>'+e.Prod_name+'</h3><br><a class="name">'+e.Prod_stat+'</a><p>$'+e.Prod_price+'</p></div>';
          	$('.content').append(pro);
          });
        }
      }).then(function(){
          //var html = '<a href="farmer.html" onClick=" "><div class="about"><img src="'+e.Farmer_Pic.url+'"></img><p class="name">'+e.Name+'</p><p>'+list+'</p></div></a>';
          var banner = '<img src="'+e.Farmer_Pic.url+'" class="farmer_head"><h2 class="slogan"><div id="farm-name">'+e.Name+'</div><div id="farmer-name">'+e.Name+'</div></h2>';
          $('.banner').append(banner);
          var description = '<p>'+e.farm_story+'</p>';
          $('.description').append(description);
          var info = '<p><i class="fa fa-home fa-2x"></i><a href="'+e.website+'">'+e.Name+'</a></p><p><i class="fa fa-facebook-square fa-2x"></i><a href="'+e.facebook+'">粉絲專頁</a></p><p><i class="fa fa-phone fa-2x"></i>'+e.telephone+'</p>';
          $('.info').append(info);
        });
      }
  });
  event.preventDefault();
}
