import { Vehicle } from "src/models/vehicle";
import { Text, Badge } from "@medusajs/ui";
import { XMark } from "@medusajs/icons";
import { useAdminCustomDelete } from "medusa-react";

const VehicleBadge = ({
  vehicle,
  refetchLinkedVehicles,
}: {
  vehicle: Vehicle;
  refetchLinkedVehicles: () => void;
}) => {
  const { mutateAsync: remove } = useAdminCustomDelete(
    `/admin/vehicle-products/${vehicle.vehicle_product_id}`,
    []
  );

  const onClick = async () => {
    await remove().then(() => {
      refetchLinkedVehicles();
    });
  };

  return (
    <Badge className="flex gap-2 min-w-fit w-40 hover:bg-ui-bg-base-hover">
      <Text className="text-grey-90">
        {vehicle.brand} {vehicle.model} ({vehicle.year})
      </Text>
      <button onClick={onClick}>
        <XMark />
      </button>
    </Badge>
  );
};

export default VehicleBadge;
