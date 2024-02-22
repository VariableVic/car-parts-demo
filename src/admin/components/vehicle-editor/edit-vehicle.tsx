import React, { useState } from "react";
import { PencilSquare } from "@medusajs/icons";
import { useAdminCustomPost } from "medusa-react";
import { VehicleDrawer } from "./vehicle-drawer";
import { Vehicle } from "../../../models/vehicle";

export function EditVehicle({
  vehicle,
  refetch,
}: {
  vehicle: Vehicle;
  refetch: () => void;
}) {
  const [open, setOpen] = useState(false);

  const { mutateAsync: update, isLoading } = useAdminCustomPost(
    `/admin/vehicles/${vehicle.id}`,
    [],
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const brand = data.get("brand") as string;
    const model = data.get("model") as string;
    const year = data.get("year") as unknown as number;

    try {
      await update({ ...vehicle, brand, model, year }).then(() => {
        refetch();
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VehicleDrawer
      label={<PencilSquare />}
      title="Edit Vehicle"
      type="transparent"
      open={open}
      setOpen={setOpen}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      vehicle={vehicle}
    />
  );
}
