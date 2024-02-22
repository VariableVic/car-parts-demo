import { MigrationInterface, QueryRunner } from "typeorm";

export class Here1708609638328 implements MigrationInterface {
  name = "Here1708609638328";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vehicle_products" DROP CONSTRAINT "FK_bb8657b79f519de633b65094819"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_products" ADD CONSTRAINT "FK_bb8657b79f519de633b65094819" FOREIGN KEY ("vehicle_id") REFERENCES "vehicle"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vehicle_products" DROP CONSTRAINT "FK_bb8657b79f519de633b65094819"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_products" ADD CONSTRAINT "FK_bb8657b79f519de633b65094819" FOREIGN KEY ("vehicle_id") REFERENCES "vehicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
