import { EntityManager, In } from "typeorm";
import { SharedContext } from "@medusajs/types";
import { VehicleProducts } from "../models/vehicle-products";
import QueryString from "qs";

type InjectedDependencies = {
  manager: EntityManager;
};

export default class VehicleProductsService {
  private manager: EntityManager;

  constructor(container: InjectedDependencies) {
    this.manager = container.manager;
  }

  private getManager(context: SharedContext = {}): EntityManager {
    return context.transactionManager || this.manager;
  }

  async list(context?: SharedContext): Promise<VehicleProducts[]> {
    const vehicleProductsRepo =
      this.getManager(context).getRepository(VehicleProducts);
    return await vehicleProductsRepo.find();
  }

  async retrieve(
    id: string,
    context?: SharedContext
  ): Promise<VehicleProducts | undefined> {
    const vehicleProductsRepo =
      this.getManager(context).getRepository(VehicleProducts);
    return await vehicleProductsRepo.findOne({ where: { id } });
  }

  async retrieveProductsByVehicleId(
    vehicle_id:
      | string
      | QueryString.ParsedQs
      | string[]
      | QueryString.ParsedQs[],
    context?: SharedContext
  ): Promise<{ id: string; product_id: string }[]> {
    const vehicleProductsRepo =
      this.getManager(context).getRepository(VehicleProducts);
    const vehicleProducts = await vehicleProductsRepo.find({
      where: {
        vehicle_id: In(Array.isArray(vehicle_id) ? vehicle_id : [vehicle_id]),
      },
    });

    const uniqueVehicleProducts = vehicleProducts.reduce((acc, vp) => {
      if (!acc.find((v) => v.product_id === vp.product_id)) {
        acc.push(vp);
      }
      return acc;
    }, [] as VehicleProducts[]);

    return uniqueVehicleProducts.map((vp) => ({
      id: vp.id,
      product_id: vp.product_id,
    }));
  }

  async retrieveVehiclesByProductId(
    product_id: string,
    context?: SharedContext
  ): Promise<{ id: string; vehicle_id: string }[]> {
    const vehicleProductsRepo =
      this.getManager(context).getRepository(VehicleProducts);
    const vehicleProducts = await vehicleProductsRepo.find({
      where: { product_id },
    });

    return vehicleProducts.map((vp) => ({
      id: vp.id,
      vehicle_id: vp.vehicle_id,
    }));
  }

  async create(
    vehicle_id: string,
    product_id: string,
    context?: SharedContext
  ): Promise<void> {
    const vehicleProductsRepo =
      this.getManager(context).getRepository(VehicleProducts);
    const vehicleProducts = vehicleProductsRepo.create({
      vehicle_id,
      product_id,
    });

    await vehicleProductsRepo.save(vehicleProducts);
  }

  async delete(id: string, context?: SharedContext): Promise<void> {
    const vehicleProductsRepo =
      this.getManager(context).getRepository(VehicleProducts);
    await vehicleProductsRepo.delete({ id });
  }
}
