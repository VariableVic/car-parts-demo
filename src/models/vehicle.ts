import { BaseEntity, generateEntityId } from "@medusajs/medusa";
import { BeforeInsert, Column, Entity } from "typeorm";

@Entity()
export class Vehicle extends BaseEntity {
  @Column()
  model: string;

  @Column()
  brand: string;

  @Column()
  year: number;

  vehicle_product_id: string;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "vehicle");
  }
}
