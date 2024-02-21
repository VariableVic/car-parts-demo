import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

import VehicleProductsService from "../../../../services/vehicle-products";
import VehicleService from "src/services/vehicle";
import { VehicleDTO } from "src/types/vehicle";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const vehicleProductsService = req.scope.resolve(
    "vehicleProductsService"
  ) as VehicleProductsService;
  const vehicleService = req.scope.resolve("vehicleService") as VehicleService;

  try {
    const vehicleProductsIds =
      await vehicleProductsService.retrieveVehiclesByProductId(req.params.id);

    const vehicleIds = vehicleProductsIds.map((vp) => vp.vehicle_id);

    const vehicles = await vehicleService.findManyByIds(vehicleIds);

    vehicles.forEach((vehicle: VehicleDTO) => {
      vehicle.vehicle_product_id = vehicleProductsIds.find(
        (vp) => vp.vehicle_id === vehicle.id
      ).id;
    });

    res.status(200).json({ vehicles });
  } catch (error) {
    res.status(400).json({ error });
  }
}
