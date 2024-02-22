import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

import VehicleService, {
  FilterableVehicleFields,
} from "../../../services/vehicle";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const vehicleService = req.scope.resolve<VehicleService>("vehicleService");

  const selector = {
    ...req.query,
  } as FilterableVehicleFields;
  const vehicles = await vehicleService.list(selector, {
    order: { brand: "ASC", model: "ASC" },
  });

  res.status(200).json({ vehicles });
}

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const vehicleService = req.scope.resolve("vehicleService") as VehicleService;
  const vehicle = await vehicleService.create(req.body);
  res.status(201).json({ vehicle });
}
