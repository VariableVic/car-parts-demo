import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

import VehicleService from "../../../services/vehicle";

// GET /admin/vehicles
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const vehicleService = req.scope.resolve<VehicleService>("vehicleService");

  const vehicles = await vehicleService.list(req.query, {
    order: { brand: "ASC", model: "ASC" },
  });

  res.status(200).json({ vehicles });
}

// POST /admin/vehicles
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const vehicleService = req.scope.resolve<VehicleService>("vehicleService");
  const vehicle = await vehicleService.create(req.body);
  res.status(201).json({ vehicle });
}
