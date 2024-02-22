import { MigrationInterface, QueryRunner } from "typeorm";

export class Here1708608945565 implements MigrationInterface {
  name = "Here1708608945565";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vehicle_products" DROP CONSTRAINT "PK_e7ec48f1bef189c2cadb145543e"`,
    );
    await queryRunner.query(`ALTER TABLE "vehicle_products" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "vehicle_products" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_products" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_products" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_products" ADD CONSTRAINT "PK_c407aed1083f3fc3082ea0d67a4" PRIMARY KEY ("vehicle_id", "product_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_products" ADD CONSTRAINT "FK_bb8657b79f519de633b65094819" FOREIGN KEY ("vehicle_id") REFERENCES "vehicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vehicle_products" DROP CONSTRAINT "FK_bb8657b79f519de633b65094819"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_products" DROP CONSTRAINT "PK_c407aed1083f3fc3082ea0d67a4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_products" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_products" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_products" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_products" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle_products" ADD CONSTRAINT "PK_e7ec48f1bef189c2cadb145543e" PRIMARY KEY ("id")`,
    );
  }
}
