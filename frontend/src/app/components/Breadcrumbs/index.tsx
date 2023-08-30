import A from '@/app/components/A';

export interface BreadcrumbItem {
  id: string;
  label: string;
  href: string;
}

export interface BreadcrumbsProps {
  path: BreadcrumbItem[];
}

export function Breadcrumbs({ path }: BreadcrumbsProps) {
  return (
    <nav>
      <ol className="mb-4 space-x-3">
        {path.map(({ id, label, href }, i) => (
          <li
            key={id}
            className="inline after:content-['/'] last:after:content-none"
          >
            {i < path.length - 1 ? (
              <A href={href} className="mr-3 capitalize">
                {label}
              </A>
            ) : (
              <span className="mr-3 capitalize">{label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
