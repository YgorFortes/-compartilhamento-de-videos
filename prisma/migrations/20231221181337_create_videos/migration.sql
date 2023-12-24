-- CreateTable
CREATE TABLE "videos" (
    "id" TEXT NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

CREATE OR REPLACE FUNCTION update_updatedAt_column() RETURNS TRIGGER AS $$ BEGIN NEW."updatedAt" = NOW(); RETURN NEW; END; $$ language 'plpgsql'; CREATE TRIGGER update_videos_updatedAt BEFORE UPDATE ON "videos" FOR EACH ROW EXECUTE PROCEDURE update_updatedAt_column();
