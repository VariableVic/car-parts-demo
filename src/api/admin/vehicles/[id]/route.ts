import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

import VehicleService from "../../../../services/vehicle";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const vehicleService = req.scope.resolve("vehicleService") as VehicleService;

  const vehicle = await vehicleService.findById(req.params.id);

  res.status(200).json({ vehicle });
}

export async function PATCH(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const vehicleService = req.scope.resolve("vehicleService") as VehicleService;

  const vehicle = await vehicleService.update(req.params.id, req.body);

  res.status(200).json({ vehicle });
}

export async function DELETE(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const vehicleService = req.scope.resolve("vehicleService") as VehicleService;

  await vehicleService.delete(req.params.id);

  res.status(200).json({});
}
