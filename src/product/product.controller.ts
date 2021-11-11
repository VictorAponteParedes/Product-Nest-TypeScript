
import { Controller, Get, Post, Put, Delete,
Res, HttpStatus, Body, Param ,NotFoundException,Query } from '@nestjs/common';
import {CreateProductDTO} from '../dto/product.dto'
import {ProductService} from '../product/product.service'
@Controller('product')

export class ProductController {
    constructor(private producService: ProductService) {}
 @Post('/create')
 async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO){
  const product = await this.producService.createProduct(createProductDTO)
     console.log(createProductDTO);
     return res.status(HttpStatus.OK).json({
     message:'Product Successfuly Created',
     product
 })

 };
 @Get('/')
 async getProducts(@Res() res){
 const product =  await this.producService.getProducts();
 res.status(HttpStatus.OK).json({
     product
 })

 }
 @Get('/:productID')
 async getProduct(@Res() res , @Param('productID') productID){
     const product = await this.producService.getProduct(productID)
     if(!product) throw new NotFoundException('Product Does Exists');
     return res.status(HttpStatus.OK).json( product )
 }
@Delete('/delete')
async getDelete(@Res() res , @Query('productID')  productID){
  const  productDeleted = await this.producService.deleteProduct(productID)
  if(!productDeleted) throw new NotFoundException('Product Does Exists');
  return res.status(HttpStatus.OK).json({
      massage:'Product Deleted Successfuly',
  });
}     
@Put('/edit') 
 async update(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productId') productID){
  const newProduct = await this.producService.updateProduct(productID , createProductDTO);
  if(!newProduct) throw new NotFoundException('Product Does Exists');
  return res.status(HttpStatus.OK).json({
      massage:'Product Update Successfuly',
      newProduct
  })

}



}
