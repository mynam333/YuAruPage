import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="page-shell route-loading" role="status" aria-label="페이지 불러오는 중">
      <Skeleton className="route-skeleton-title" />
      <Skeleton className="route-skeleton-body" />
    </div>
  )
}
