-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "cor" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

CREATE OR REPLACE FUNCTION update_updatedAt_column() RETURNS TRIGGER AS $$ BEGIN NEW."updatedAt" = NOW(); RETURN NEW; END; $$ language 'plpgsql'; CREATE TRIGGER update_videos_updatedAt BEFORE UPDATE ON "categorias" FOR EACH ROW EXECUTE PROCEDURE update_updatedAt_column();