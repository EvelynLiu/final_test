$(document).ready(function() {
  Parse.initialize('cBg30mmL0gugVy89T8VSVyRLE0swECDDg5ccJ46N','xJoUF67t6m6DneUpQna1HKOnCnGm29dUWuifPCrg');
})

function getData(page,category){
  alert(0);
  window.scrollTo(0,0);
  // To support pagination.
  var limit = 15;
  var skip = (page-1) * limit;
  var Farmer = Parse.Object.extend("Farmer");
  var query = new Parse.Query(Farmer);
  console.log(query);
  query.limit(limit);
  query.skip(skip);
  query.equalTo("district", category);
  query.descending("createdAt");
  console.log(query);
  query.find({
    success: function(results) {
      alert(1);
      var objList = results.map(function (e){ return e.toJSON() });
      objList.forEach(function(e){
        console.log(e);
        var html = '<img src="'+e.Name+'"></img><p class="name">'+e.Name+'</p><p>'+e.Name+'</p>';
        //var html = '<h2>'+e.title+'</h2>'+e.size;
        //$('#content').html("");
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

