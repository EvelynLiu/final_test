$(document).ready(function() {
  Parse.initialize('cBg30mmL0gugVy89T8VSVyRLE0swECDDg5ccJ46N','xJoUF67t6m6DneUpQna1HKOnCnGm29dUWuifPCrg');
})

function search(str){
  var limit = 15;
  var Farmer = Parse.Object.extend("Farmer");
  var Product = Parse.Object.extend("Product");
  var query = new Parse.Query(Product);
  var queryF = new Parse.Query(Farmer);
  var list = "hihi";
  query.limit(limit);
  query.contains("Prod_name", str);
  query.descending("createdAt");
  query.find({
    success: function(results) {
      $('.content').html("");
      var objList = results.map(function (e){ return e.toJSON() });
      objList.forEach(function (e){
        queryF.descending("createdAt");
        queryF.equalTo("objectId",e.Farmer);
        queryF.find({
          success: function(output){
            var farmer = output.map(function (e){ return e.toJSON() });
            list = farmer[0].Name;
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        }).then(function(){
          var html = '<a href="product_detail.html?name='+e.objectId+'"><div class="about"><img src="'+e.Prod_Pic.url+'"></img><p class="name">'+e.Prod_name+'</p><p>'+list+'</p></div></a>';
          $('.content').append(html);
        });
      });
    }
  });
  event.preventDefault();
}


function getData(page,category){
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
          var html = '<a href="farmer.html?name='+e.objectId+'"><div class="about"><img src="'+e.Farmer_Pic.url+'"></img><p class="name">'+e.Name+'</p><p>'+list+'</p></div></a>';
          $('.content').append(html);
        });
      });
      //底下的小分頁=================
      query.limit(0);
      query.skip(0);
      var option = {};
      query.count({
        success: function(count){
        var totalPage = Math.ceil(count / limit);
        var currentPage = parseInt(page);
        option = {
          'previous': (currentPage === 1) ? 1 : currentPage-1,
          'next': (currentPage === totalPage) ? currentPage : currentPage+1,
          'current': currentPage,
          'last': totalPage,
        };
        }, 
        error: function(err){

        }  
      });
      //===========================
    }
  });
  event.preventDefault();
}


function call (id){
  var Farmer = Parse.Object.extend("Farmer");
  var Product = Parse.Object.extend("Product");
  var query = new Parse.Query(Farmer);
  var queryP = new Parse.Query(Product);
  query.equalTo("objectId", id);
  query.find({
    success: function(results) {
      var objList = results.map(function (e){ return e.toJSON() });
      queryP.descending("createdAt");
      queryP.equalTo("Farmer",id);
      queryP.find({
        success: function(output){
          var productList = output.map(function (e){ return e.toJSON() });
          productList.forEach(function (e){
            var pro = '<a href="product_detail.html?name='+e.objectId+'"><div class="product"><img src="'+e.Prod_Pic.url+'"></img><h3>'+e.Prod_name+'</h3><br><a class="name">'+e.Prod_stat+'</a><p>$'+e.Prod_price+'</p></div></a>';
            $('.content_p').append(pro);
            console.log(pro);
          })
        }
      }).then(function(){
          var banner = '<img src="'+objList[0].Farmer_Pic.url+'" class="farmer_head"><h2 class="slogan"><div id="farm-name">'+objList[0].FarmLand+'</div><div id="farmer-name">'+objList[0].Name+'</div></h2>';
          $('.banner').append(banner);
          var description = '<p>'+objList[0].farm_story+'</p>';
          $('.description').append(description);
          var info = '<p><i class="fa fa-home fa-2x"></i><a href="'+objList[0].website+'">'+objList[0].FarmLand+'</a></p><p><i class="fa fa-facebook-square fa-2x"></i><a href="'+objList[0].facebook+'">粉絲專頁</a></p><p><i class="fa fa-phone fa-2x"></i>'+objList[0].telephone+'</p>';
          $('.info').append(info);
        });
    }
  });
  event.preventDefault();
}



function getProd(page,category){
  var limit = 15;
  var skip = (page-1) * limit;
  var Farmer = Parse.Object.extend("Farmer");
  var Product = Parse.Object.extend("Product");
  var query = new Parse.Query(Product);
  var queryF = new Parse.Query(Farmer);
  var list = "hihi";
  query.limit(limit);
  query.skip(skip);
  query.equalTo("Category", category);
  query.descending("createdAt");
  query.find({
    success: function(results) {
      $('.content').html("");
      var objList = results.map(function (e){ return e.toJSON() });
      objList.forEach(function (e){
        queryF.descending("createdAt");
        queryF.equalTo("objectId",e.Farmer);
        queryF.find({
          success: function(output){
            var farmer = output.map(function (e){ return e.toJSON() });
            list = farmer[0].Name;
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        }).then(function(){
          var html = '<a href="product_detail.html?name='+e.objectId+'"><div class="about"><img src="'+e.Prod_Pic.url+'"></img><p class="name">'+e.Prod_name+'</p><p>'+list+'</p></div></a>';
          $('.content').append(html);
        });
      });
      //底下的小分頁=================
      query.limit(0);
      query.skip(0);
      var option = {};
      query.count({
        success: function(count){
        var totalPage = Math.ceil(count / limit);
        var currentPage = parseInt(page);
        option = {
          'previous': (currentPage === 1) ? 1 : currentPage-1,
          'next': (currentPage === totalPage) ? currentPage : currentPage+1,
          'current': currentPage,
          'last': totalPage,
        };
        }, 
        error: function(err){

        }  
      });
      //===========================
    }
  });
  event.preventDefault();
}


function callprod (id){
  var Farmer = Parse.Object.extend("Farmer");
  var Product = Parse.Object.extend("Product");
  var query = new Parse.Query(Product);
  var queryF = new Parse.Query(Farmer);
  var farmerName="";
  var farmerId="";
  var farmerPic="";
  query.equalTo("objectId", id);
  query.find({
    success: function(results) {
      var objList = results.map(function (e){ return e.toJSON() });
      console.log(objList);
      queryF.descending("createdAt");
      queryF.equalTo("objectId",objList[0].Farmer);
      queryF.find({
        success: function(output){
          var farmer = output.map(function (e){ return e.toJSON() });
          console.log(farmer);
          farmerName = farmer[0].Name;
          farmerId = farmer[0].objectId;
          farmerPic = farmer[0].Farmer_Pic.url;
          farmLand = farmer[0].FarmLand;
        }
      }).then(function(){
          var detail = '<img src="'+objList[0].Prod_Pic.url+'" id="product-img"><div class="product-info"><h2 id="product-title">'+objList[0].Prod_name+'</h2><p id="product-catogory">'+objList[0].Category+'</p><ul><p id="product-price">每'+objList[0].Prod_stat+' '+objList[0].Prod_price+'元</p><li class="detail-title">規格</li>'+objList[0].Prod_stat+'，紙箱裝<li class="detail-title">運送方式</li>'+objList[0].Prod_arrive+'，200元<li class="detail-title">付費方式</li>'+objList[0].Prod_payment+'</ul><a id="button" href="farmer.html?name='+farmerId+'">立刻購買</a></div>';
          $('.product-detail').append(detail);
          var description = '<li>農友</li><img src="'+farmerPic+'" id="farmer-img"><a href="farmer.html?name='+farmerId+'" id="farm-name">'+farmLand+'&nbsp&nbsp&nbsp</a><a href="farmer.html?name='+farmerId+'" id="farmer-name">'+farmerName+'</a>';
          $('#farm-description').append(description);
          var prodescription = '<div id="product-description">'+objList[0].Prod_describe+'</div>';
          $('#product-description').append(prodescription);
        });
    }
  });
  event.preventDefault();
}
