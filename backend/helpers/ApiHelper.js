class ApiHelper {
  // query=ProductSchema.find()

  constructor(query, queryStr) {
    this.query = query;// mongo db exection query 
 
    this.queryStr = queryStr; //query string url
      
  }
  search() {
    //queryStr.keyword=samsung
    const keyword = this.queryStr.keyword ? {
          product_category_tree: {
            $regex: this.queryStr.keyword,
            $options: "i",
          }
        }
      : { product_category_tree: {
            $regex: "pencil",
            $options: "i",
          }};
      
    this.query = this.query.find({ ...keyword });
    return this;
    
  }
  filter() {
    const filtter={...this.queryStr};
    const remove=["keyword","page",'limit'];
    remove.forEach( key=> delete filtter[key])
  
   this.query=this.query.find(filtter);
    return this;
  }
  pagination(resultperpage) {

    const currentPage=Number(this.queryStr.page) || 1;
    const skip=resultperpage*(currentPage - 1);
    this.query=this.query.limit(resultperpage).skip(skip);
    return this;

  }
}

export default ApiHelper;
