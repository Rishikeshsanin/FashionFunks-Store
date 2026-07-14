import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const defaults = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function SearchIcon(props: IconProps) {
  return <svg {...defaults} {...props}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>;
}

export function BagIcon(props: IconProps) {
  return <svg {...defaults} {...props}><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>;
}

export function UserIcon(props: IconProps) {
  return <svg {...defaults} {...props}><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.7-4 3-6 7-6s6.3 2 7 6" /></svg>;
}

export function HeartIcon(props: IconProps & { filled?: boolean }) {
  const { filled, ...rest } = props;
  return <svg {...defaults} {...rest} fill={filled ? "currentColor" : "none"}><path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z" /></svg>;
}

export function MenuIcon(props: IconProps) {
  return <svg {...defaults} {...props}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
}

export function CloseIcon(props: IconProps) {
  return <svg {...defaults} {...props}><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

export function ArrowIcon(props: IconProps) {
  return <svg {...defaults} {...props}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

export function ChevronIcon(props: IconProps) {
  return <svg {...defaults} {...props}><path d="m7 9 5 5 5-5" /></svg>;
}

export function MinusIcon(props: IconProps) {
  return <svg {...defaults} {...props}><path d="M5 12h14" /></svg>;
}

export function PlusIcon(props: IconProps) {
  return <svg {...defaults} {...props}><path d="M12 5v14M5 12h14" /></svg>;
}

export function TrashIcon(props: IconProps) {
  return <svg {...defaults} {...props}><path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5" /></svg>;
}

export function StarIcon(props: IconProps & { filled?: boolean }) {
  const { filled, ...rest } = props;
  return <svg {...defaults} {...rest} fill={filled ? "currentColor" : "none"}><path d="m12 3 2.7 5.5 6 .9-4.4 4.2 1 6-5.3-2.8-5.3 2.8 1-6-4.4-4.2 6-.9L12 3Z" /></svg>;
}

export function MoonIcon(props: IconProps) {
  return <svg {...defaults} {...props}><path d="M20 15.4A8 8 0 0 1 8.6 4 8 8 0 1 0 20 15.4Z" /></svg>;
}

export function SunIcon(props: IconProps) {
  return <svg {...defaults} {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>;
}

export function CheckIcon(props: IconProps) {
  return <svg {...defaults} {...props}><path d="m5 12 4 4L19 6" /></svg>;
}
