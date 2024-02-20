import { MigrationInterface, QueryRunner } from "typeorm";

export class VehicleCreate1708106099853 implements MigrationInterface {
  name = "VehicleCreate1708106099853";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "vehicle" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "model" character varying NOT NULL, "brand" character varying NOT NULL, "year" integer NOT NULL, CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "vehicle_products" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "vehicle_id" character varying NOT NULL, "product_id" character varying NOT NULL, CONSTRAINT "PK_e7ec48f1bef189c2cadb145543e" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "vehicle_products"`);
    await queryRunner.query(`DROP TABLE "vehicle"`);
  }
}
