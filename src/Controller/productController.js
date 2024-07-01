const productService = require("../Service/productService");
exports.productList=async (req, res) => {
    const data = await productService(req);
    res.status(200).json(data);
}