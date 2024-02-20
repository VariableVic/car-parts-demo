import { WidgetConfig, WidgetProps } from "@medusajs/admin";
import { Product } from "@medusajs/medusa";
import { useAdminCustomQuery } from "medusa-react";

import { Container } from "../components/shared/container";
import { VehicleSelect } from "../components/vehicle-selector/select";
import { Vehicle } from "../../models/vehicle";
import VehicleBadge from "../components/vehicle-selector/vehicle-badge";
import { VehicleList } from "../components/vehicle-editor/vehicle-list";

type InjectedProps = WidgetProps & {
  product: Product;
};

const ProductVehicleEditor = (props: InjectedProps) => {
  const { product } = props;

  const { data: vehiclesData } = useAdminCustomQuery("/admin/vehicles", []);
  const {
    data: linkedVehiclesData,
    refetch: refetchLinkedVehicles,
    isLoading,
  } = useAdminCustomQuery(`/admin/product-vehicles/${product.id}`, []);

  const vehicles = vehiclesData?.vehicles as Vehicle[];
  const linkedVehicles = linkedVehiclesData?.vehicles as Vehicle[];

  return (
    <Container
      title="Link product to vehicles"
      description={`Use the dropdown to link ${product.title} to one or more vehicles.`}
    >
      {vehicles && vehicles.length > 0 && linkedVehicles ? (
        <VehicleSelect
          vehicles={vehicles}
          productId={product.id}
          linkedVehicles={linkedVehicles}
          refetchLinkedVehicles={refetchLinkedVehicles}
        />
      ) : (
        <p>Loading vehicles...</p>
      )}

      <div className="mb-6">
        {linkedVehicles && linkedVehicles.length > 0 ? (
          <VehicleList
            data={linkedVehiclesData}
            refetch={refetchLinkedVehicles}
            isLoading={isLoading}
            hasEdit={false}
            page="products"
          />
        ) : (
          // <>
          //   <p className="inter-base-semibold mb-4">Linked vehicles:</p>
          //   <ul className="flex gap-2 flex-wrap">
          //     {linkedVehicles.map((v) => (
          //       <li key={v.vehicle_product_id}>
          //         <VehicleBadge
          //           vehicle={v}
          //           refetchLinkedVehicles={refetchLinkedVehicles}
          //         />
          //       </li>
          //     ))}{" "}
          //   </ul>
          // </>
          <p>No vehicles linked.</p>
        )}
      </div>
    </Container>
  );
};

export const config: WidgetConfig = {
  zone: "product.details.after",
};

export default ProductVehicleEditor;
