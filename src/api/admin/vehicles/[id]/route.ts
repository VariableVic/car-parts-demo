import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

import VehicleService from "../../../../services/vehicle";

// GET /admin/vehicles/:id
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const vehicleService = req.scope.resolve<VehicleService>("vehicleService");

  const vehicle = await vehicleService.retrieve(req.params.id);

  res.status(200).json({ vehicle });
}

// POST /admin/vehicles/:id
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const vehicleService = req.scope.resolve<VehicleService>("vehicleService");

  const vehicle = await vehicleService.update(req.params.id, req.body);

  res.status(200).json({ vehicle });
}

// DELETE /admin/vehicles/:id
export async function DELETE(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const vehicleService = req.scope.resolve<VehicleService>("vehicleService");

  await vehicleService.delete(req.params.id);

  res.status(200).json({});
}
