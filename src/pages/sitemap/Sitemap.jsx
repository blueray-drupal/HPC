import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '@/components/layout/PageHero.jsx';
import { SITEMAP_HERO_IMAGE, SITEMAP_SECTIONS } from './sitemapData.js';

const PAGE_TITLE = 'خريطة الموقع';

function SitemapCard({ to, label, Icon, children }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-[#6c9a4e] hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-[#6c9a4e]/10 p-2 text-[#6c9a4e]">
          <Icon size={20} aria-hidden="true" />
        </div>
        <Link to={to} className="text-lg font-bold text-[#6c9a4e] hover:underline">
          {label}
        </Link>
      </div>

      {children.length > 0 ? (
        <ul className="mr-4 space-y-2">
          {children.map((child) => (
            <li key={`${child.to}-${child.label}`}>
              <Link
                to={child.to}
                className="flex items-center gap-2 text-sm opacity-70 transition-all hover:text-[#6c9a4e] hover:opacity-100"
              >
                <ChevronLeft size={14} aria-hidden="true" />
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function Sitemap() {
  return (
    <div dir="rtl">
      <PageHero
        title={PAGE_TITLE}
        image={SITEMAP_HERO_IMAGE}
        imageAlt={PAGE_TITLE}
        breadcrumbs={[{ to: '/', label: 'الرئيسية' }, { label: PAGE_TITLE }]}
      />

      <section className="relative z-10 bg-gray-50 py-16 text-gray-800 dark:bg-gray-950 dark:text-gray-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">{PAGE_TITLE}</h2>
              <p className="text-lg opacity-70">تصفح جميع صفحات وأقسام موقع صندوق الحج الأردني</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SITEMAP_SECTIONS.map((section) => (
                <SitemapCard key={section.id} {...section} />
              ))}
            </div>

            <div className="mt-12 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-bold">هل تحتاج إلى مساعدة؟</h3>
              <p className="mb-4 opacity-70">
                إذا لم تجد ما تبحث عنه في خريطة الموقع، يمكنك التواصل معنا مباشرة:
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:+96265625500"
                  className="rounded-lg bg-[#6c9a4e] px-6 py-3 font-bold text-white transition-all hover:bg-[#5a8240]"
                >
                  اتصل بنا
                </a>
                <a
                  href="mailto:info@hajjfund.gov.jo"
                  className="rounded-lg border border-gray-300 px-6 py-3 font-bold text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  أرسل رسالة
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
