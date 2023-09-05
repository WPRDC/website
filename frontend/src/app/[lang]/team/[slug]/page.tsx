import { Metadata } from 'next';
import { getContentBySlug } from '@/app/lib/data-fetchers';
import { IAuthor } from '@/app/types';
import A from '@/app/components/A';
import { ParsedHTML } from '@/app/components/ParsedHTML';
import { PageLayout } from '@/app/components/PageLayout';
import { Title } from '@/app/components/Title';
import { PrimaryLink } from '@/app/components/PrimaryLink';

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
    <PageLayout>
      <article className="">
        <Title>{name}</Title>
        <PrimaryLink url={`mailto:${email}`} label={email} external={false} />
        <ParsedHTML>{bio ?? ''}</ParsedHTML>
      </article>
    </PageLayout>
  );
}
