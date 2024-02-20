import React, { useState } from "react";
import { VehicleDrawer } from "./vehicle-drawer";
import { Vehicle } from "../../../models/vehicle";
import { VehicleDTO } from "../../../types/vehicle";

export function EditVehicle({
  vehicle,
  refetch,
}: {
  vehicle: Vehicle;
  refetch: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateVehicle = async (vehicle: VehicleDTO) => {
    setIsLoading(true);
    await fetch(`${process.env.BASE_URL}/admin/vehicles/${vehicle.id}`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicle),
    }).then(() => refetch());
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const brand = data.get("brand") as string;
    const model = data.get("model") as string;
    const year = data.get("year") as unknown as number;

    try {
      await updateVehicle({ ...vehicle, brand, model, year });
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VehicleDrawer
      label="Edit"
      title="Edit Vehicle"
      type="secondary"
      open={open}
      setOpen={setOpen}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      vehicle={vehicle}
    />
  );
}
