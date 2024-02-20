import { Select } from "@medusajs/ui";
import { useAdminCustomPost } from "medusa-react";
import { useMemo } from "react";

import { Vehicle } from "../../../models/vehicle";

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

    // Sort brands alphabetically
    const sortedBrands = Object.keys(brandMap).sort();

    // Sort models alphabetically for each brand
    sortedBrands.forEach((brand) => {
      brandMap[brand].sort((a, b) => a.model.localeCompare(b.model));
    });

    // Construct the final sorted map
    const sortedVehicleBrandMap = sortedBrands.reduce((acc, brand) => {
      acc[brand] = brandMap[brand];
      return acc;
    }, {});

    return sortedVehicleBrandMap;
  }, [vehiclesToShow]);

  const { mutateAsync: add } = useAdminCustomPost(
    `/admin/vehicle-products/`,
    []
  );

  const onChange = async (vehicle_id: string) => {
    await add({ vehicle_id, product_id: productId }).then(() => {
      refetchLinkedVehicles();
    });
  };

  if (!vehicleBrandMap) {
    return <p>Loading vehicles...</p>;
  }

  return (
    <div className="my-6">
      <Select
        onValueChange={(v) => {
          onChange(v);
        }}
        value=""
      >
        <Select.Trigger>
          <Select.Value placeholder="Select vehicles" />
        </Select.Trigger>
        <Select.Content>
          {Object.keys(vehicleBrandMap).map((brand) => (
            <Select.Group key={brand}>
              <Select.Label>{brand}</Select.Label>
              {vehicleBrandMap[brand].map((item) => (
                <Select.Item key={item.id} id={item.id} value={item.id}>
                  {item.brand} {item.model} ({item.year})
                </Select.Item>
              ))}
            </Select.Group>
          ))}
        </Select.Content>
      </Select>
    </div>
  );
};
