import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <header className="max-w-5xl mx-auto px-7 pt-7 flex items-center justify-between">
        <div className="font-display text-xl font-semibold">
          Mind<span className="text-[var(--clay)]">Chiwi</span>
        </div>
        <Link
          href="/login"
          className="rounded-lg bg-[var(--pine)] text-[var(--panel)] px-5 py-2.5 text-sm font-medium"
        >
          Entrar
        </Link>
      </header>

      <section className="max-w-5xl mx-auto px-7 pt-16 pb-10">
        <h1 className="font-display font-medium text-4xl md:text-5xl leading-tight max-w-[13ch]">
          Tu día a día con cada niño, en un solo lugar.
        </h1>
        <p className="mt-5 text-lg text-[var(--ink-soft)] max-w-[46ch]">
          MindChiwi es un espacio de trabajo pensado para psicólogas y psicólogos infantiles:
          agenda, fichas de pacientes, sesiones y objetivos, sin hojas sueltas ni carpetas dispersas.
        </p>
        <div className="mt-7 flex gap-4 flex-wrap items-center">
          <Link
            href="/registro"
            className="rounded-lg bg-[var(--pine)] text-[var(--panel)] px-6 py-3 text-sm font-medium"
          >
            Crear cuenta
          </Link>
          <Link href="/login" className="text-sm text-[var(--ink-soft)] underline">
            Ya tengo cuenta
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-7 py-14">
        <p className="font-display text-2xl font-medium max-w-[32ch] leading-snug">
          Todo lo que hoy llevas en la cabeza, en papel o en varias apps, aquí vive en un mismo lugar.
        </p>
        <p className="mt-4 text-[var(--ink-soft)] max-w-[52ch]">
          Calendario, pacientes, sesiones y tareas conectados entre sí — pensado junto a una
          psicóloga infantil, no adivinado desde fuera.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-7 py-14 grid gap-6 md:grid-cols-2">
        {[
          { titulo: "Calendario claro", texto: "Sesiones y tareas de la semana, de un vistazo." },
          { titulo: "Ficha por paciente", texto: "Datos, sesiones y notas, siempre a mano." },
          { titulo: "Seguimiento de objetivos", texto: "En qué está trabajando cada paciente." },
          { titulo: "Tareas con paciente opcional", texto: "Lo que toca hacer, ligado a quien corresponda." },
        ].map((item) => (
          <div key={item.titulo} className="rounded-2xl bg-[var(--panel)] border border-[var(--line)] p-6">
            <h3 className="font-display text-lg font-medium mb-2">{item.titulo}</h3>
            <p className="text-sm text-[var(--ink-soft)]">{item.texto}</p>
          </div>
        ))}
      </section>

      <footer className="max-w-5xl mx-auto px-7 py-10 text-sm text-[var(--ink-soft)]">
        MindChiwi — herramienta para psicología infantil
      </footer>
    </>
  );
}