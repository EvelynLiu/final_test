$(document).ready(function() {
  Parse.initialize('cBg30mmL0gugVy89T8VSVyRLE0swECDDg5ccJ46N','xJoUF67t6m6DneUpQna1HKOnCnGm29dUWuifPCrg');
})

function getData(page,category,tab){
  alert(0);
  if(tab==="tab1"){
    $('#tab1').attr("checked","checked");
    $('#tab2').removeAttr("checked");
    $('#tab3').removeAttr("checked"); 
    $('#tab4').removeAttr("checked");  
    $('#tab5').removeAttr("checked");
  }
  else if(tab==="tab2"){
    $('#tab2').attr("checked","checked");
    $('#tab1').removeAttr("checked");
    $('#tab3').removeAttr("checked"); 
    $('#tab4').removeAttr("checked");  
    $('#tab5').removeAttr("checked"); 
  }
  else if(tab==="tab3"){
    $('#tab3').attr("checked","checked");
    $('#tab2').removeAttr("checked");
    $('#tab1').removeAttr("checked"); 
    $('#tab4').removeAttr("checked");  
    $('#tab5').removeAttr("checked"); 
  }
  else if(tab==="tab4"){
    $('#tab4').attr("checked","checked");
    $('#tab2').removeAttr("checked");
    $('#tab3').removeAttr("checked"); 
    $('#tab1').removeAttr("checked");  
    $('#tab5').removeAttr("checked"); 
  }
  else if(tab==="tab5"){
    $('#tab5').attr("checked","checked");
    $('#tab2').removeAttr("checked");
    $('#tab3').removeAttr("checked"); 
    $('#tab4').removeAttr("checked");  
    $('#tab1').removeAttr("checked"); 
  }
  var limit = 15;
  var skip = (page-1) * limit;
  var Farmer = Parse.Object.extend("Farmer");
  var Product = Parse.Object.extend("Product");
  var query = new Parse.Query(Farmer);
  var queryP = new Parse.Query(Product);
  var list = "hihi";

  query.limit(limit);
  query.skip(skip);
  query.equalTo("district", category);
  query.descending("createdAt");
  query.find({
    success: function(results) {
      $('.content').html("");
      var objList = results.map(function (e){ return e.toJSON() });
      //console.log(objList);
      objList.forEach(function (e){
        queryP.descending("createdAt");
        queryP.equalTo("Farmer",e.objectId);
        queryP.find({
          success: function(output){
            var productList = output.map(function (e){ return e.toJSON() });
            //console.log(productList);
            list="";
            productList.forEach(function (e){
             list += e.Prod_name+" ";
            });
          },
          error: function(error) {
          alert("Error: " + error.code + " " + error.message);
          }
        }).then(function(){
          var id = "'"+e.objectId+"'";
          var html = '<a href="farmer.html" onClick="call('+id+')"><div class="about"><img src="'+e.Farmer_Pic.url+'"></img><p class="name">'+e.Name+'</p><p>'+list+'</p></div></a>';
          $('.content').append(html);
        });
      });
      //document.getElementById('content').innerHTML = templates.catalogTemplate(objList);
      query.limit(0);
      query.skip(0);
      var option = {};
      // To support pagination.
      query.count({
        success: function(count){
        var totalPage = Math.ceil(count / limit);
        var currentPage = parseInt(page);
        option = {
          // Watch out the limit.
          'previous': (currentPage === 1) ? 1 : currentPage-1,
          'next': (currentPage === totalPage) ? currentPage : currentPage+1,
          'current': currentPage,
          'last': totalPage,
        };
        //document.getElementById('pagination').innerHTML = 
        //templates.catalogPaginationTemplate(option);
        }, 
        error: function(err){

        }  
      });
    }
  });
  event.preventDefault();
}


function call (id){
  alert(0);
  //window.scrollTo(0,0);
  var Farmer = Parse.Object.extend("Farmer");
  var Product = Parse.Object.extend("Product");
  var query = new Parse.Query(Farmer);
  var queryP = new Parse.Query(Product);
  query.equalTo("objectId", id);
  query.find({
    success: function(results) {
      alert(1);
      //$('.content').html("");
      var objList = results.map(function (e){ return e.toJSON() });
      objList.forEach(function (e){
        queryP.descending("createdAt");
        queryP.equalTo("Farmer",id);
        queryP.find({
          success: function(output){
            var productList = output.map(function (e){ return e.toJSON() });
            console.log(productList);
            productList.forEach(function (e){
              var pro = '<div class="product"><img src="'+e.Prod_Pic.url'"></img><h3>'+e.Prod_name+'</h3><br><a class="name">'+e.Prod_stat+'</a><p>$'+e.Prod_price+'</p></div>';
              //var pro = '<p>ioio</p>';
              $('.content').append(pro);
              console.log(pro);
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
        });
      }
  });
  event.preventDefault();
  return true;
  console.log("true");
}
