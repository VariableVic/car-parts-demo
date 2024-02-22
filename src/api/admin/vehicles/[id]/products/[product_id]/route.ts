import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import VehicleService from "../../../../../../services/vehicle";

export async function DELETE(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const { id, product_id } = req.params;
  const vehicleService = req.scope.resolve<VehicleService>("vehicleService");
  await vehicleService.removeFromProduct(id, product_id);
  res.status(200).json({ message: "Vehicle product deleted" });
}
