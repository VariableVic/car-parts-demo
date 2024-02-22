import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

import VehicleService from "../../../../services/vehicle";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const vehicleService = req.scope.resolve("vehicleService") as VehicleService;

  const vehicle = await vehicleService.retrieve(req.params.id);

  res.status(200).json({ vehicle });
}
