import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

import VehicleService from "../../../services/vehicle";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const vehicleService = req.scope.resolve("vehicleService") as VehicleService;

  const vehicles = await vehicleService.list();

  vehicles.sort((a, b) => {
    const astring = a.brand + a.model;
    const bstring = b.brand + b.model;

    if (astring < bstring) {
      return -1;
    }
    if (astring > bstring) {
      return 1;
    }
    return 0;
  });

  res.status(200).json({ vehicles });
}

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const vehicleService = req.scope.resolve("vehicleService") as VehicleService;

  const vehicle = await vehicleService.create(req.body);

  res.status(201).json({ vehicle });
}
