import { Table } from "@medusajs/ui";
import { DeleteVehicle } from "./delete-vehicle";
import { EditVehicle } from "./edit-vehicle";

export function VehicleList({
  productId,
  data,
  isLoading,
  refetch,
  page = "settings",
  hasEdit = true,
}: {
  productId?: string;
  data: Record<string, any>;
  isLoading: boolean;
  refetch: () => void;
  page: "settings" | "products";
  hasEdit?: boolean;
}) {
  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  const vehicles = data.vehicles.sort((a, b) => a.brand.localeCompare(b.brand));

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Brand</Table.HeaderCell>
          <Table.HeaderCell>Model</Table.HeaderCell>
          <Table.HeaderCell>Year</Table.HeaderCell>
          {hasEdit && <Table.HeaderCell></Table.HeaderCell>}
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {vehicles.map((vehicle) => {
          return (
            <Table.Row
              key={vehicle.id}
              className="[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap"
            >
              <Table.Cell>{vehicle.brand}</Table.Cell>
              <Table.Cell>{vehicle.model}</Table.Cell>
              <Table.Cell>{vehicle.year}</Table.Cell>
              {hasEdit && (
                <Table.Cell className="text-right">
                  <EditVehicle vehicle={vehicle} refetch={refetch} />
                </Table.Cell>
              )}
              <Table.Cell>
                <DeleteVehicle
                  productId={productId}
                  vehicle={vehicle}
                  refetch={refetch}
                  page={page}
                />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
