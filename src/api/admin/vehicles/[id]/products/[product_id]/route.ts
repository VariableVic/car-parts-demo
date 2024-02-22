import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import VehicleService from "../../../../../../services/vehicle";

export async function DELETE(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const { id, product_id } = req.params;
  const vehicleService = req.scope.resolve<VehicleService>(
    "vehicleService",
  );

  try {
    await vehicleService.removeFromProduct(id, product_id);
    res.status(200).json({ message: "Vehicle product deleted" });
  } catch (error) {
    res.status(400).json({ message: "Vehicle product not deleted" });
  }
}
