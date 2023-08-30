import { Metadata } from 'next';
import { getContentBySlug } from '@/app/lib/data-fetchers';
import { IAuthor } from '@/app/types';
import A from '@/app/components/A';
import { ParsedHTML } from '@/app/components/ParsedHTML';

type Props = {
  params: {
    lang: string;
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getContentBySlug<IAuthor>(
    '/authors',
    params.slug,
    params.lang,
  );
  return {};
  //
  // if (!page.data[0].attributes?.seo) return FALLBACK_SEO;
  // const metadata = page.data[0].attributes.seo;
  //
  // return {
  //   title: metadata.metaTitle,
  //   description: metadata.metaDescription,
  // };
}

export default async function PageRoute({ params }: Props) {
  const author = await getContentBySlug<IAuthor>(
    '/authors',
    params.slug,
    params.lang,
  );
  const { name, email, bio } = author.data[0].attributes;

  return (
    <div className="container flex items-start space-x-12 px-4 pt-12 md:mx-auto lg:max-w-5xl">
      <article className="">
        <h1 className="mb-4 text-4xl font-bold">{name}</h1>
        <div className="mb-4">
          <A href={`mailto:${email}`}>{email}</A>
        </div>
        <ParsedHTML>{bio ?? ''}</ParsedHTML>
      </article>
    </div>
  );
}
