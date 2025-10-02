-- CreateTable
CREATE TABLE "Trabajador" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "sueldo" DOUBLE PRECISION NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Trabajador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nomina" (
    "id" SERIAL NOT NULL,
    "trabajadorId" INTEGER NOT NULL,
    "cantidad" DOUBLE PRECISION NOT NULL,
    "extra" DOUBLE PRECISION NOT NULL,
    "is_user" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Nomina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pagar" (
    "id" SERIAL NOT NULL,
    "nominaId" INTEGER NOT NULL,
    "is_user" TEXT NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pagar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Nomina" ADD CONSTRAINT "Nomina_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "Trabajador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagar" ADD CONSTRAINT "Pagar_nominaId_fkey" FOREIGN KEY ("nominaId") REFERENCES "Nomina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
