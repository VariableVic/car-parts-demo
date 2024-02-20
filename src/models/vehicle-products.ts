import { SoftDeletableEntity, generateEntityId } from "@medusajs/medusa";
import { BeforeInsert, Column, Entity } from "typeorm";

@Entity()
export class VehicleProducts extends SoftDeletableEntity {
  @Column()
  vehicle_id: string;

  @Column()
  product_id: string;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "vehiprod");
  }
}
