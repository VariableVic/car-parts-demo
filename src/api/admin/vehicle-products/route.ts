import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

import VehicleProductsService from "../../../services/vehicle-products";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const vehicleProductsService = req.scope.resolve(
    "vehicleProductsService"
  ) as VehicleProductsService;

  const { vehicle_id, product_id } = req.query;

  try {
    if (vehicle_id) {
      const vehicleProducts =
        await vehicleProductsService.retrieveProductsByVehicleId(
          vehicle_id as string
        );
      res.status(200).json({ products: vehicleProducts });
    }

    if (product_id) {
      const vehicleProducts =
        await vehicleProductsService.retrieveVehiclesByProductId(
          product_id as string
        );
      res.status(200).json({ vehicles: vehicleProducts });
    }

    const vehicleProducts = await vehicleProductsService.list();

    res.status(200).json({ vehicle_products: vehicleProducts });
  } catch (error) {
    res.status(400).json({ message: "Vehicle products not found" });
  }
}

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const { vehicle_id, product_id } = req.body;

  const vehicleProductsService = req.scope.resolve(
    "vehicleProductsService"
  ) as VehicleProductsService;

  try {
    const vehicleProduct = await vehicleProductsService.create(
      vehicle_id,
      product_id
    );

    res
      .status(201)
      .json({ message: "Vehicle product created", vehicleProduct });
  } catch (error) {
    res.status(400).json({ message: "Vehicle product not created" });
  }
}
