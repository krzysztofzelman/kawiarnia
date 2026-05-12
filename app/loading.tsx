import SkeletonCard from "@/components/SkeletonCard";

export default function Loading() {
  return (
    <>
      <SkeletonCard variant="hero" />
      <SkeletonCard variant="card" />
      <SkeletonCard variant="list" />
      <SkeletonCard variant="contact" />
    </>
  );
}
