import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

import VehicleService from "../../../services/vehicle";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const vehicleService = req.scope.resolve("vehicleService") as VehicleService;

  const vehicles = await vehicleService.list();

  res.status(200).json({ vehicles });
}
