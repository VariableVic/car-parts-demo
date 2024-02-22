import type { MiddlewaresConfig } from "@medusajs/medusa";
import type {
  MedusaNextFunction,
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa";
import VehicleService from "../services/vehicle";

const vehicleProductsMiddleware = async (
  req: MedusaRequest,
  res: MedusaResponse,
  next: MedusaNextFunction,
) => {
  const vehicle_id = req.query.vehicle_id as string | string[];
  if (!vehicle_id || !vehicle_id.length) {
    return next();
  }

  const vehicleService = req.scope.resolve<VehicleService>("vehicleService");
  const prodIds = await vehicleService.listProductIds({ id: vehicle_id });

  req.url = req.url.split("?")[0];
  delete req.query.vehicle_id;
  req.query = { ...req.query, id: prodIds };

  next();
};

export const config: MiddlewaresConfig = {
  routes: [
    {
      matcher: "/store/products",
      middlewares: [vehicleProductsMiddleware],
      method: "GET",
    },
  ],
};
