import { BaseEntity, generateEntityId } from "@medusajs/medusa";
import { BeforeInsert, Column, Entity, OneToMany } from "typeorm";
import { VehicleProducts } from "./vehicle-products";

@Entity()
export class Vehicle extends BaseEntity {
  @Column()
  model: string;

  @Column()
  brand: string;

  @Column()
  year: number;

  @OneToMany(() => VehicleProducts, (vp) => vp.vehicle)
  products: VehicleProducts[];

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "vehicle");
  }
}
