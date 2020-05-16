
function DateModified(data){
  return { 
    Products : data.Products,
    Total : data.Total,
    UserInfo : data.UserInfo ? data.UserInfo : null,
    UserCache : {
      fullPrice : data.fullprice ? data.fullprice : null,
      openDiscount : false,
      paymentSuccess : true
     }
    }
  }
function Summery(data){
  var products = data.Products;
  var total = 0;
  products.forEach(obj => {
    obj.Total = obj.productAmount*obj.totalPrice;
    total += obj.Total;
  });

  return { 
    Products : products,
    Total : total,
    UserInfo : data.UserInfo,
    UserCache : {fullPrice : total }
  };
}
function RemoveProduct(data, id){
  data.Products.splice(data.Products.map(obj=>obj.PID).findIndex(oid => oid == id),1)
  return Summery(data);

}

module.exports = { Summery, RemoveProduct, DateModified };

