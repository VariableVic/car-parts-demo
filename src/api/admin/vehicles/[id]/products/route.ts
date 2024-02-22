import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import VehicleService from "../../../../../services/vehicle";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const { id } = req.params;
  const vehicleService = req.scope.resolve<VehicleService>("vehicleService");
  const vehicleProducts = await vehicleService.listProductIds({ id });
  res.status(200).json({ products: vehicleProducts });
}

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const { id } = req.params;
  const { product_id } = req.body;

  const vehicleService = req.scope.resolve<VehicleService>("vehicleService");

  try {
    console.log(id, product_id);
    await vehicleService.addToProduct(id, product_id);
    res.status(201).json({ message: "Vehicle product created" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Vehicle product not created" });
  }
}
