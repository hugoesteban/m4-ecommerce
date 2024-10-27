import { Order } from 'src/orders/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'int',
  })
  phone: number; //cuando se usa un numero de telefono real no permite la inserción en BD

  @Column({
    type: 'text',
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  country: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  city: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isAdmin: boolean;

  // @JoinColumn({ name: 'orders_id' })
  @OneToMany(() => Order, (order) => order.user, {
    cascade: true, // Las órdenes se eliminarán al eliminar un usuario
    onDelete: 'CASCADE', // Asegura que la eliminación sea en cascada
  })
  orders: Order[];
}

/*
constructor(
  public id: number,
  public email: string,
  public name: string,
  public password: string,
  public address: string,
  public phone: string,
  public country?: string | undefined,
  public city?: string | undefined,
) {}
*/
