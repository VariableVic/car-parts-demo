import type { MiddlewaresConfig } from "@medusajs/medusa";
import type {
  MedusaNextFunction,
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa";
import VehicleProductsService from "../services/vehicle-products";

const vehicleProductsMiddleware = async (
  req: MedusaRequest,
  res: MedusaResponse,
  next: MedusaNextFunction
) => {
  // get vehicleProductsService from scope
  const vehicleProductsService = req.scope.resolve<VehicleProductsService>(
    "vehicleProductsService"
  );

  // get vehicle_id from query
  const vehicle_id = req.query.vehicle_id || req.query["vehicle_id[]"];

  if (!vehicle_id) {
    next();
    return;
  }

  // remove vehicle_id from query, as the next middleware will not expect it
  delete req.query.vehicle_id;

  // remove all query params from url
  const newUrl = req.url.split("?")[0];
  req.url = newUrl;

  // get vehicle products
  const vehicleProds = await vehicleProductsService.retrieveProductsByVehicleId(
    vehicle_id
  );

  // add vehicle products to query
  req.query = {
    ...req.query,
    id: vehicleProds.map((vp) => vp.product_id),
  };

  // call next middleware
  next();
  return;
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
