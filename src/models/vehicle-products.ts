import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Vehicle } from "./vehicle";

@Entity()
export class VehicleProducts {
  @PrimaryColumn()
  vehicle_id: string;

  @PrimaryColumn()
  product_id: string;

  @ManyToOne(() => Vehicle, (v) => v.products, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "vehicle_id" })
  vehicle: Vehicle;
}
