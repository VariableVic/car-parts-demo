// import type { MiddlewaresConfig } from "@medusajs/medusa";
// import type {
//   MedusaNextFunction,
//   MedusaRequest,
//   MedusaResponse,
// } from "@medusajs/medusa";

// const vehicleProductsMiddleware = async (
//   req: MedusaRequest,
//   res: MedusaResponse,
//   next: MedusaNextFunction
// ) => {
//   const productId = req.params["0"];
//   if (!productId.includes("prod_")) {
//     next();
//   }

//   const vehicleProductsService = req.scope.resolve("vehicleProductsService");
//   const productService = req.scope.resolve("productService");

//   try {
//     const vehicles = await vehicleProductsService.retrieveVehiclesByProductId(
//       productId
//     );
//     const product = await productService.retrieve(productId);

//     product.vehicles = vehicles;

//     console.log({ product });

//     res.status(200).json({ product });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error });
//   }
// };

// export const config: MiddlewaresConfig = {
//   routes: [
//     {
//       matcher: "/admin/products/*",
//       middlewares: [vehicleProductsMiddleware],
//       method: "GET",
//     },
//   ],
// };
