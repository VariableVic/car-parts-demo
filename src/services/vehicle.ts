import { EntityManager, In } from "typeorm";
import { SharedContext } from "@medusajs/types";
import { Vehicle } from "../models/vehicle";

type InjectedDependencies = {
  manager: EntityManager;
};

export default class VehicleService {
  private manager: EntityManager;

  constructor(container: InjectedDependencies) {
    this.manager = container.manager;
  }

  private getManager(context: SharedContext = {}): EntityManager {
    return context.transactionManager || this.manager;
  }

  async list(context?: SharedContext): Promise<Vehicle[]> {
    const vehicleRepo = this.getManager(context).getRepository(Vehicle);
    return await vehicleRepo.find();
  }

  async create(
    data: Partial<Vehicle>,
    context?: SharedContext
  ): Promise<Vehicle> {
    const vehicleRepo = this.getManager(context).getRepository(Vehicle);
    const vehicle = vehicleRepo.create(data);
    return await vehicleRepo.save(vehicle);
  }

  async update(
    id: string,
    data: Partial<Vehicle>,
    context?: SharedContext
  ): Promise<Vehicle> {
    const vehicleRepo = this.getManager(context).getRepository(Vehicle);
    const vehicle = await vehicleRepo.findOne({ where: { id } });

    if (!vehicle) {
      // Handle case where vehicle with given ID doesn't exist
      // You may throw an error or handle it differently based on your application's logic
      throw new Error(`Vehicle with ID ${id} not found`);
    }

    Object.assign(vehicle, data);

    return await vehicleRepo.save(vehicle);
  }

  async delete(id: string, context?: SharedContext): Promise<void> {
    const vehicleRepo = this.getManager(context).getRepository(Vehicle);
    await vehicleRepo.delete({ id });
  }

  async findById(
    id: string,
    context?: SharedContext
  ): Promise<Vehicle | undefined> {
    const vehicleRepo = this.getManager(context).getRepository(Vehicle);
    return await vehicleRepo.findOne({ where: { id } });
  }

  async findManyByIds(
    ids: string[],
    context?: SharedContext
  ): Promise<Vehicle[]> {
    const vehicleRepo = this.getManager(context).getRepository(Vehicle);
    return await vehicleRepo.findBy({ id: In(ids) });
  }
}
