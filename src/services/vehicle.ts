import { EntityManager, In } from "typeorm";
import { Vehicle } from "../models/vehicle";
import { VehicleProducts } from "../models/vehicle-products";
import { buildQuery, FindConfig } from "@medusajs/medusa";

type InjectedDependencies = {
  manager: EntityManager;
};

export default class VehicleService {
  private manager: EntityManager;

  constructor(container: InjectedDependencies) {
    this.manager = container.manager;
  }

  async list(
    filters?: FilterableVehicleFields,
    config: FindConfig<Vehicle> = {},
  ): Promise<Vehicle[]> {
    const vehicleRepo = this.manager.getRepository(Vehicle);
    const { product_id, ...rest } = filters;
    const query = buildQuery(rest, config);

    if (product_id) {
      query.where = {
        ...query.where,
        products: {
          product_id: In([product_id]),
        },
      };
    }

    return await vehicleRepo.find(query);
  }

  async create(
    data: Partial<Vehicle>,
  ): Promise<Vehicle> {
    const vehicleRepo = this.manager.getRepository(Vehicle);
    const vehicle = vehicleRepo.create(data);
    return await vehicleRepo.save(vehicle);
  }

  async update(
    id: string,
    data: Partial<Vehicle>,
  ): Promise<Vehicle> {
    const vehicleRepo = this.manager.getRepository(Vehicle);
    const vehicle = await vehicleRepo.findOne({ where: { id } });

    if (!vehicle) {
      // Handle case where vehicle with given ID doesn't exist
      // You may throw an error or handle it differently based on your application's logic
      throw new Error(`Vehicle with ID ${id} not found`);
    }

    Object.assign(vehicle, data);

    return await vehicleRepo.save(vehicle);
  }

  async delete(id: string): Promise<void> {
    const vehicleRepo = this.manager.getRepository(Vehicle);
    await vehicleRepo.delete(id);
  }

  async retrieve(
    id: string,
  ): Promise<Vehicle | undefined> {
    const vehicleRepo = this.manager.getRepository(Vehicle);
    return await vehicleRepo.findOne({ where: { id } });
  }

  async listProductIds(
    filters: FilterableVehicleFields,
  ) {
    const vehicles = await this.list(filters, {
      select: ["id"],
      relations: ["products"],
    });
    return vehicles.map((v) => v.products.map((p) => p.product_id)).flat();
  }

  async addToProduct(
    vehicleId: string,
    productId: string,
  ) {
    const vehicleProductsRepo = this.manager.getRepository(VehicleProducts);
    const vehicleProducts = vehicleProductsRepo.create({
      vehicle_id: vehicleId,
      product_id: productId,
    });

    await vehicleProductsRepo.save(vehicleProducts);
  }

  async removeFromProduct(
    vehicleId: string,
    productId: string,
  ) {
    const vehicleProductsRepo = this.manager.getRepository(VehicleProducts);
    await vehicleProductsRepo.delete({
      vehicle_id: vehicleId,
      product_id: productId,
    });
  }
}

export type FilterableVehicleFields = {
  id?: string | string[];
  brand?: string | string[];
  model?: string | string[];
  year?: number | number[];
  product_id?: string;
};
