-- CreateTable
CREATE TABLE "Entidades" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" INTEGER NOT NULL,

    CONSTRAINT "Entidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Domicilio" (
    "id" SERIAL NOT NULL,
    "calle" TEXT NOT NULL,
    "n_interior" TEXT NOT NULL,
    "n_exterior" TEXT NOT NULL,
    "cp" TEXT NOT NULL,
    "colonia_id" INTEGER NOT NULL,
    "ciudad_id" INTEGER NOT NULL,
    "estado_id" INTEGER NOT NULL,

    CONSTRAINT "Domicilio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Colonia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Colonia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ciudad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Ciudad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estado" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alumno" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido1" TEXT NOT NULL,
    "apellido2" TEXT NOT NULL,
    "nacimiento" TIMESTAMP(3) NOT NULL,
    "genero" BOOLEAN NOT NULL,
    "domicilio_id" INTEGER NOT NULL,
    "plan_estudios" INTEGER NOT NULL,

    CONSTRAINT "Alumno_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
-- CREATE UNIQUE INDEX "Domicilio_colonia_id_key" ON "Domicilio"("colonia_id");

-- CreateIndex
-- CREATE UNIQUE INDEX "Domicilio_ciudad_id_key" ON "Domicilio"("ciudad_id");

-- CreateIndex
-- CREATE UNIQUE INDEX "Domicilio_estado_id_key" ON "Domicilio"("estado_id");

-- AddForeignKey
ALTER TABLE "Domicilio" ADD CONSTRAINT "Domicilio_colonia_id_fkey" FOREIGN KEY ("colonia_id") REFERENCES "Colonia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Domicilio" ADD CONSTRAINT "Domicilio_ciudad_id_fkey" FOREIGN KEY ("ciudad_id") REFERENCES "Ciudad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Domicilio" ADD CONSTRAINT "Domicilio_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "Estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alumno" ADD CONSTRAINT "Alumno_domicilio_id_fkey" FOREIGN KEY ("domicilio_id") REFERENCES "Domicilio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
