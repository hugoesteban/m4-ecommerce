import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { OrderDetail } from 'src/order-details/order-detail.entity';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/product.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class OrdersRepository {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailsRepository: Repository<OrderDetail>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async getAllOrdersRepository(userId: string) {
    return await this.ordersRepository.find({
      where: { user: { id: userId } }, //filtro por el id del usuario en la relación
      relations: ['user', 'orderDetail'],
    });
  }

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------

  async getOrderByIdRepository(id: string, userId: string) {
    const order = await this.ordersRepository.findOne({
      where: {
        id,
        user: { id: userId },
      },
      relations: {
        orderDetail: {
          products: true,
        },
      },
    });
    if (!order) {
      throw new NotFoundException(`Order id ${id} no encontrado`);
    }

    return order;
  }

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------

  async addOrderRepository(userId: string, products: any) {
    let total = 0;
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User id: ${userId} not found`);
    }
    const order = new Order();
    order.date = new Date();
    order.user = user;
    const newOrder = await this.ordersRepository.save(order);
    const productsArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.productsRepository.findOneBy({
          id: element.id,
        });
        if (!product) {
          throw new NotFoundException(`Product id ${element.id} no encontrado`);
        }
        if (product.stock < 1) {
          throw new BadRequestException(
            `Product id ${element.id} no tiene stock suficiente`,
          );
        }
        total += Number(product.price);
        await this.productsRepository.update(
          { id: element.id },
          { stock: --product.stock },
        );
        return product;
      }),
    );
    //Creamos orderDetail e inserción en la base de datos
    const orderDetail = new OrderDetail();
    orderDetail.price = Number(Number(total).toFixed(2));
    orderDetail.order = newOrder;
    orderDetail.products = productsArray;
    await this.orderDetailsRepository.save(orderDetail);

    // Enviamos al cliente la compra con la info de productos
    return await this.ordersRepository.find({
      where: { id: newOrder.id },
      relations: { orderDetail: true },
    });
  }

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  /*
  async restoreStockBeforeDeleteUser(userId: string) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User id: ${userId} not found`);
    }
    //buscar en order las ordenes pertenecientes al usuario
    const orders = await this.ordersRepository.find({
      where: { user: { id: userId } },
    });

    if (!orders.length) {
      console.log(
        `No se encontraron órdenes para el usuario con id: ${userId}`,
      );
      return;
    }

    //recorrer las ordenes
    let ordenesEliminadas = [];
    let contadores = { ordenes: 0, productos: 0 };

    for (const order of orders) {
      contadores.productos = 0;
      const orderDetail = await this.orderDetailsRepository.findOne({
        where: { order: { id: order.id } },
        relations: ['products'],
      });
      //recorrer los productos
      for (const product of orderDetail.products) {
        await this.productsRepository.update(
          { id: product.id },
          { stock: product.stock + 1 },
        );
        contadores.productos += 1;
      }
      contadores.ordenes += 1;
      ordenesEliminadas.push(contadores);
    }

    ordenesEliminadas.forEach((element) => {
      console.log(
        `Se restauró el stock de  ${element.product} de la orden ${element.ordenes}`,
      );
    });
    return;
  }*/

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
}
