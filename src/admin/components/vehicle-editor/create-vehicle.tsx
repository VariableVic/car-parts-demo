import React, { useState } from "react";
import { useAdminCustomPost } from "medusa-react";
import { VehicleDrawer } from "./vehicle-drawer";

export function CreateVehicle({ refetch }: { refetch: () => void }) {
  const [open, setOpen] = useState(false);

  const { mutateAsync, isLoading } = useAdminCustomPost("/admin/vehicles", []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const brand = data.get("brand");
    const model = data.get("model");
    const year = data.get("year");

    try {
      await mutateAsync({ brand, model, year });
      refetch();
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VehicleDrawer
      label="Add New Vehicle +"
      title="Add New Vehicle"
      type="primary"
      open={open}
      setOpen={setOpen}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
    />
  );
}
