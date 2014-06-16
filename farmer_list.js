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
  //================LIST!!!
  var list = "hihi";
  //================

  query.limit(limit);
  query.skip(skip);
  query.equalTo("district", category);
  query.descending("createdAt");
  query.find({
    success: function(results) {
      $('.content').html("");
      var objList = results.map(function (e){ return e.toJSON() });
      console.log(objList);
      objList.forEach(function (e){
        queryP.descending("createdAt");
        queryP.equalTo("Farmer",e.objectId);
        queryP.find({
          success: function(output){
            var productList = output.map(function (e){ return e.toJSON() });
            console.log(productList);
            productList.forEach(function (e){
             list = e.Prod_name+" ";
              console.log("Inner0"+list);
            });
            console.log("Inner1"+list);
          }
          console.log("Inner2"+list);
        });
        console.log("Outer"+list);
        var html = '<a href="farmer.html" onClick=" "><div class="about"><img src="'+e.Farmer_Pic.url+'"></img><p class="name">'+e.Name+'</p><p>'+list+'</p></div></a>';
        $('.content').append(html);
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

