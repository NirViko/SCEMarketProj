class salesReport
{

    constructor(cartID, PID, Pname, Pamount, totalPrice, cDate, customerName, customerEmail)
    {
        this.cartID = cartID;
        this.PID = PID;
        this.Pname = Pname;
        this.Pamount = Pamount;
        this.totalPrice = totalPrice;
        this.cDate = cDate;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
    }
}
module.exports = salesReport;