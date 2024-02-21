import type { SettingConfig } from "@medusajs/admin";
import { Container } from "../../components/shared/container";
import { CreateVehicle } from "../../components/vehicle-editor/create-vehicle";
import { VehicleList } from "../../components/vehicle-editor/vehicle-list";
import { useAdminCustomQuery } from "medusa-react";

const VehicleSettings = () => {
  const { data, isLoading, refetch } = useAdminCustomQuery(
    "/admin/vehicles",
    []
  );

  return (
    <Container title="Vehicles" description="Manage your vehicles">
      <div className="flex justify-end my-6">
        <CreateVehicle refetch={refetch} />
      </div>
      <VehicleList
        data={data}
        isLoading={isLoading}
        refetch={refetch}
        page="settings"
      />
    </Container>
  );
};

export const config: SettingConfig = {
  card: {
    label: "Vehicles",
    description: "Manage your vehicles",
  },
};

export default VehicleSettings;
