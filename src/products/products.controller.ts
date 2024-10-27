import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Post,
  Query,
  UseGuards,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/users/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductDtoCreate } from './product.dto.create';
import { CategoriesService } from 'src/categories/categories.service';
import { ProductDtoUpdate } from './product.dto.update';
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------
  @Get()
  @HttpCode(HttpStatus.OK)
  findAllProductsController(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.productsService.findAllProductsService(page, limit);
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOneProductsController(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findOneProductsService(id);
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  // @Roles(Role.Admin)
  // @UseGuards(AuthGuard, RolesGuard)
  async createProductsController(@Body() productDto: ProductDtoCreate) {
    const categories = await this.categoriesService.getCategories();
    const categoryFound = categories.find(
      (category) => category.name === productDto.category,
    );
    if (!categoryFound) {
      throw new NotFoundException('Category not found');
    }

    const newProduct = {
      ...productDto,
      category: categoryFound,
    };
    return this.productsService.createProductsService(newProduct);
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  @Post('seeder')
  addProductsController() {
    return this.productsService.addProductsService();
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async updateProductsController(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productDto: ProductDtoUpdate,
  ) {
    if (productDto.category) {
      const categories = await this.categoriesService.getCategories();
      const categoryFound = categories.find(
        (category) => category.name === productDto.category,
      );
      if (!categoryFound) {
        throw new NotFoundException('Category not found');
      }
      const newProduct = {
        ...productDto,
        category: categoryFound,
      };
      return this.productsService.updateProductsService(id, newProduct);
    } else return this.productsService.updateProductsService(id, productDto);
  }

  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteProductsController(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProductsService(id);
  }
}
