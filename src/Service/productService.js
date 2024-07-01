const productModel=require('../Model/productModel')
const productService=async (req) => {
    let pageNo = Number(req.params.pageNo);
    let perPage = Number(req.params.perPage);
    let searchValue = req.params.searchKey;
    const skipRow = (pageNo - 1) * perPage;
    let Rows;
    let Total;
    let result;
    if (searchValue !== '0') {
        let searchRegx = {$regex: searchValue, $options: 'i'};
        let searchQuery = {$or: [{title: searchRegx},{category:searchRegx},{remark:searchRegx},{subcategory:searchRegx},{brand:searchRegx}]}
         result = await productModel.aggregate([
            {
                $facet:{
                   Total:[{$match:searchQuery},{$count:'count'}],
                    Rows:[{$match:searchQuery},{$skip:skipRow},{$limit:perPage}]
                }
            }
        ])
    }
    else {
             result = await productModel.aggregate([
                {
                    $facet:{
                        Total:[{$count:'count'}],
                        Rows:[{$skip:skipRow},{$limit:perPage}]
                    }
                }
            ])
    }
    return {status:"success",data:result}
}

module.exports=productService;