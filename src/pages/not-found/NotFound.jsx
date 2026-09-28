import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout.jsx';

export default function NotFound() {
  return (
    <PageLayout title="الصفحة غير متاحة">
      <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          الصفحة التي تحاول الوصول إليها غير موجودة أو تم نقلها.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-[#6c9a4e] px-6 py-3 font-bold text-white transition-colors hover:bg-[#5a8240]"
        >
          العودة إلى الرئيسية
        </Link>
      </div>
    </PageLayout>
  );
}
