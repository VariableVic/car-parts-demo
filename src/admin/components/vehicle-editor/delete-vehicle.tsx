import { Button } from "@medusajs/ui";
import { Trash } from "@medusajs/icons";
import { useAdminCustomDelete } from "medusa-react";

import { VehicleDTO } from "src/types/vehicle";

export function DeleteVehicle({
  productId,
  page = "settings",
  vehicle,
  refetch,
}: {
  productId?: string;
  page: "settings" | "products";
  vehicle: VehicleDTO;
  refetch: () => void;
}) {
  let endpoint = `/admin/vehicles/${vehicle.id}`;
  if (page === "products") {
    endpoint += `/products/${productId}`;
  }

  const { mutateAsync: remove, isLoading } = useAdminCustomDelete(endpoint, []);

  const deleteVehicle = async () => {
    await remove().then(() => {
      refetch();
    });
  };

  return (
    <Button
      size="small"
      onClick={deleteVehicle}
      isLoading={isLoading}
      variant="transparent"
    >
      <Trash />
    </Button>
  );
}
