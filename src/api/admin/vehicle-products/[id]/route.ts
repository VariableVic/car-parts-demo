import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

import VehicleProductsService from "../../../../services/vehicle-products";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const vehicleProductsService = req.scope.resolve(
    "vehicleProductsService"
  ) as VehicleProductsService;
  const vehicleProduct = await vehicleProductsService.retrieve(
    req.params.vehicleId
  );

  res.status(200).json({ vehicleProduct });
}

export async function DELETE(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const vehicleProductsService = req.scope.resolve(
    "vehicleProductsService"
  ) as VehicleProductsService;

  try {
    await vehicleProductsService.delete(req.params.id);
    res.status(200).json({ message: "Vehicle product deleted" });
  } catch (error) {
    res.status(400).json({ message: "Vehicle product not found" });
  }
}
