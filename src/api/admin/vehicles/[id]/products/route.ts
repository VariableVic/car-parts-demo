import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import VehicleService from "../../../../../services/vehicle";

// GET /admin/vehicles/:id/products
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const { id } = req.params;
  const vehicleService = req.scope.resolve<VehicleService>("vehicleService");
  const vehicleProducts = await vehicleService.listProductIds({ id });
  res.status(200).json({ products: vehicleProducts });
}

// POST /admin/vehicles/:id/products
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const { id } = req.params;
  const { product_id } = req.body;
  const vehicleService = req.scope.resolve<VehicleService>("vehicleService");
  await vehicleService.addToProduct(id, product_id);
  res.status(201).json({ message: "Vehicle product created" });
}
