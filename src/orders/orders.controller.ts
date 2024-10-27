import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderCreateDto } from './ordercreate.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getAllOrdersByUserController(@Request() req) {
    const userId = req.user.id;
    console.log('req.user:', req.user);
    console.log('userId:', userId);

    return this.ordersService.getAllOrdersService(userId);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getOrderByUserController(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.ordersService.getOrderService(id, userId);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  addOrderController(@Body() order: OrderCreateDto) {
    const { userId, products } = order;
    return this.ordersService.addOrderService(userId, products);
  }
}
