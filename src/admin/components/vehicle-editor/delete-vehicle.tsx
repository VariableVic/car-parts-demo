import { Button } from "@medusajs/ui";
import { useAdminCustomDelete } from "medusa-react";

import { VehicleDTO } from "src/types/vehicle";

export function DeleteVehicle({
  page = "settings",
  vehicle,
  refetch,
}: {
  page: "settings" | "products";
  vehicle: VehicleDTO;
  refetch: () => void;
}) {
  const endpoint =
    page === "settings" ? "/admin/vehicles" : "/admin/vehicle-products";

  const id = page === "settings" ? vehicle.id : vehicle.vehicle_product_id;

  const { mutateAsync: remove, isLoading } = useAdminCustomDelete(
    `${endpoint}/${id}`,
    []
  );

  const deleteVehicle = async () => {
    await remove().then(() => {
      refetch();
    });
  };

  return (
    <Button onClick={deleteVehicle} isLoading={isLoading} variant="danger">
      Delete
    </Button>
  );
}
