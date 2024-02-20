import { Drawer, Button, Label, Input } from "@medusajs/ui";
import { Vehicle } from "src/models/vehicle";

export function VehicleDrawer({
  label,
  title,
  type,
  open,
  setOpen,
  isLoading,
  handleSubmit,
  vehicle,
}: {
  label: string;
  title: string;
  type: "primary" | "secondary" | "transparent" | "danger";
  open: boolean;
  setOpen: (state: boolean) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  vehicle?: Vehicle;
}) {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <Button onClick={() => setOpen(true)} variant={type}>
          {label}
        </Button>
      </Drawer.Trigger>
      <Drawer.Content className="w-96 right-2">
        <Drawer.Header>
          <Drawer.Title>{title}</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className="p-4">
          <form id="create-vehicle" onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label>Brand</Label>
              <Input
                type="text"
                name="brand"
                placeholder="Brand"
                defaultValue={vehicle?.brand}
              />
            </div>
            <div className="mb-4">
              <Label>Model</Label>
              <Input
                type="text"
                name="model"
                placeholder="Model"
                defaultValue={vehicle?.model}
              />
            </div>
            <div className="mb-4">
              <Label>Year</Label>
              <Input
                type="text"
                name="year"
                placeholder="Year"
                defaultValue={vehicle?.year}
              />
            </div>
          </form>
        </Drawer.Body>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button type="reset" variant="secondary">
              Cancel
            </Button>
          </Drawer.Close>
          <Button form="create-vehicle" type="submit" isLoading={isLoading}>
            Save
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}
