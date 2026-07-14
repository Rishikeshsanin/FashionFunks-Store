import { EmptyState } from "@/components/empty-state";

export default function NotFound() {
  return <div className="page-shell"><EmptyState eyebrow="404 · Off the rack" title="That page has moved on." copy="The look you followed is no longer here, but there is plenty more to discover." /></div>;
}
