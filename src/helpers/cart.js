
function DateModified(data){
  return {
    Products : data.Products,
    Total : data.Total,
    UserInfo : data.UserInfo ? data.UserInfo : null,
    UserCache : {
      fullPrice : data.UserCache.fullPrice ? data.UserCache.fullPrice : null,
      openDiscount : false,
      paymentSuccess : true
    }
  }
}
function AddQuantity(data) {
  var products = data.Products;
    products.forEach(obj => {
      obj.Pquantity = 1;
    })
  return {
    Products : products,
    user : data.user
  };

}

function Summery(data){
  var products = data.Products;
  var total = 0;
  products.forEach(obj => {
    obj.Total = obj.Pquantity*obj.Pprice;
    total += obj.Total;
  });
  return {
    Products : products,
    Total : total,
    UserInfo : data.user,
    UserCache : {fullPrice : total }
  };
}
function RemoveProduct(data, id) {
  data.Products.splice(data.Products.map(obj => obj.PID).findIndex(oid => oid == id), 1)
  return Summery(data);


}
module.exports = { Summery, RemoveProduct, DateModified, AddQuantity};

