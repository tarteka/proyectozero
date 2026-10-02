// Iconos de marca que react-icons ya no empaqueta (p. ej. Oracle, retirado de
// react-icons/si desde la v5.6 por motivos de marca). Trazo oficial de
// simple-icons, para usarse como cualquier icono de react-icons.

export function SiOracle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
      role="img"
      aria-label="Oracle"
    >
      <path d="M16.412 4.412h-8.82a7.588 7.588 0 0 0-.008 15.176h8.828a7.588 7.588 0 0 0 0-15.176zm-.193 12.502H7.786a4.915 4.915 0 0 1 0-9.828h8.433a4.914 4.914 0 1 1 0 9.828z" />
    </svg>
  );
}
