import { keywords } from '@/contants';
import useTrans from '@/hooks/useTrans';
import Head from 'next/head';
import { useRouter } from 'next/router';

type Props = {
  title?: string;
};

const defaultTitle = "Calculator Tools - Free Online Calculators";
const defaultDescription = "Access a comprehensive collection of free online calculators for everyday calculations, unit conversions, financial planning, BMI, percentage calculations, and more. No downloads required!";

const Header = ({ title }: Props) => {
  const trans = useTrans();
  const router = useRouter();
  return (
    <Head>
      <title>{title ?? defaultTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="robots" content="index, follow" />
      <meta name="revisit-after" content="1 days" />
      <meta name="color-scheme" content="dark light" />
      <meta itemProp="name" content={title ?? defaultTitle} />
      <meta name="description" content={defaultDescription} />
      <meta name="keywords" content="calculator, online calculator, math calculator, percentage calculator, BMI calculator, unit converter, loan calculator, free calculator tools, basic calculator, scientific calculator" />
      <meta name="author" content="Calculator Tools" />
      <meta property="og:locale" content={router.locale} />
      <meta itemProp="image" content={`${process.env.NEXT_PUBLIC_DOMAIN}/thumb.png`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title ?? defaultTitle} />
      <meta name="twitter:description" content={defaultDescription} />
      <meta name="twitter:image:src" content={`${process.env.NEXT_PUBLIC_DOMAIN}/thumb.png`} />
      <meta property="og:title" content={title ?? defaultTitle} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${process.env.NEXT_PUBLIC_DOMAIN}/thumb.png`} />
      <meta property="og:description" content={defaultDescription} />
      <meta property="og:site_name" content="Calculator Tools" />
      <link
        rel="apple-touch-icon"
        sizes="192x192"
        href={`${process.env.NEXT_PUBLIC_DOMAIN}/snapthumb.png`}
      />
      <link rel="shortcut icon" href="/favicon.webp" />
      <meta name="google" content="notranslate" />
      <link rel="alternate" hrefLang="x-default" href={process.env.NEXT_PUBLIC_DOMAIN} />
      <link rel="alternate" hrefLang="vi" href={`${process.env.NEXT_PUBLIC_DOMAIN}`} />
      <link rel="alternate" hrefLang="en" href={`${process.env.NEXT_PUBLIC_DOMAIN}/en`} />
      <link rel="alternate" hrefLang="in" href={`${process.env.NEXT_PUBLIC_DOMAIN}/in`} />
      <link rel="alternate" hrefLang="br" href={`${process.env.NEXT_PUBLIC_DOMAIN}/br`} />
      <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/${router.locale}`} />
    </Head>
  );
};

export default Header;
