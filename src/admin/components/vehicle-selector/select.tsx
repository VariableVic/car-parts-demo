import { Button, DropdownMenu } from "@medusajs/ui";
import { Plus } from "@medusajs/icons";
import { useAdminCustomPost } from "medusa-react";
import { useMemo } from "react";

import { Vehicle } from "../../../models/vehicle";

const DropdownMenuVehicleItem = (
  { item, refetchLinkedVehicles, productId },
) => {
  const { mutateAsync: add } = useAdminCustomPost(
    `/admin/vehicles/${item.id}/products`,
    [],
  );

  const onChange = async () => {
    await add({ product_id: productId }).then(() => {
      refetchLinkedVehicles();
    });
  };

  return (
    <DropdownMenu.Item onClick={onChange} id={item.id}>
      {item.brand} {item.model} ({item.year})
    </DropdownMenu.Item>
  );
};

export const VehicleSelect = ({
  vehicles,
  linkedVehicles,
  productId,
  refetchLinkedVehicles,
}: {
  vehicles: Vehicle[];
  linkedVehicles: Vehicle[];
  productId: string;
  refetchLinkedVehicles: () => void;
}) => {
  const linkedVehicleIds = new Set(linkedVehicles.map((lv) => lv.id));

  const vehiclesToShow = vehicles.filter((v) => !linkedVehicleIds.has(v.id));

  const vehicleBrandMap = useMemo(() => {
    const brandMap = vehiclesToShow.reduce((acc, vehicle) => {
      const { brand } = vehicle;
      if (!acc[brand]) {
        acc[brand] = [];
      }
      acc[brand].push(vehicle);
      return acc;
    }, {});

    return brandMap;
  }, [vehiclesToShow]);

  if (!vehicleBrandMap) {
    return <p>Loading vehicles...</p>;
  }

  return (
    <div className="my-6">
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <Button size="small" variant="secondary">
            <Plus /> Add vehicles
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {Object.keys(vehicleBrandMap).map((brand) => (
            <DropdownMenu.SubMenu>
              <DropdownMenu.SubMenuTrigger className="rounded-md">
                {brand}
              </DropdownMenu.SubMenuTrigger>
              <DropdownMenu.SubMenuContent>
                {vehicleBrandMap[brand].map((item) => (
                  <DropdownMenuVehicleItem
                    key={item.id}
                    item={item}
                    refetchLinkedVehicles={refetchLinkedVehicles}
                    productId={productId}
                  />
                ))}
              </DropdownMenu.SubMenuContent>
            </DropdownMenu.SubMenu>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
};
