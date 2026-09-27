type AvatarProps = {
  nombre: string;
  apellidos: string;
  size?: "sm" | "md";
};

export function Avatar({ nombre, apellidos, size = "md" }: AvatarProps) {
  const iniciales = `${nombre.charAt(0)}${apellidos.charAt(0)}`.toUpperCase();
  const sizeClasses = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";

  return (
    <div
      className={`${sizeClasses} rounded-full bg-[var(--pine-light)] text-[var(--pine)] flex items-center justify-center font-semibold shrink-0`}
    >
      {iniciales}
    </div>
  );
}