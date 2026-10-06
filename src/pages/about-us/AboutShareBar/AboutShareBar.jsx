import { FaFacebookF, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { Plus } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation.js';
import './AboutShareBar.css';

function PrintIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none" aria-hidden="true">
      <path
        d="M14.4 3.6H3.6V0H14.4V3.6ZM14.4 8.55C14.655 8.55 14.8689 8.4636 15.0417 8.2908C15.2145 8.118 15.3006 7.9044 15.3 7.65C15.2994 7.3956 15.213 7.182 15.0408 7.0092C14.8686 6.8364 14.655 6.75 14.4 6.75C14.145 6.75 13.9314 6.8364 13.7592 7.0092C13.587 7.182 13.5006 7.3956 13.5 7.65C13.4994 7.9044 13.5858 8.1183 13.7592 8.2917C13.9326 8.4651 14.1462 8.5512 14.4 8.55ZM12.6 14.4V10.8H5.4V14.4H12.6ZM14.4 16.2H3.6V12.6H0V7.2C0 6.435 0.2625 5.7939 0.7875 5.2767C1.3125 4.7595 1.95 4.5006 2.7 4.5H15.3C16.065 4.5 16.7064 4.7589 17.2242 5.2767C17.742 5.7945 18.0006 6.4356 18 7.2V12.6H14.4V16.2Z"
        fill="white"
      />
    </svg>
  );
}

const SHARE_ACTION_IDS = [
  { id: 'share', labelKey: 'share.share', icon: Plus, theme: 'blue' },
  { id: 'print', labelKey: 'share.print', icon: PrintIcon, theme: 'orange', isCustomIcon: true },
  {
    id: 'linkedin',
    labelKey: null,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/sharing/share-offsite/?url=',
    icon: FaLinkedinIn,
    theme: 'linkedin',
    usesShareUrl: true,
  },
  {
    id: 'x',
    labelKey: null,
    label: 'X',
    href: 'https://twitter.com/intent/tweet?url=',
    icon: FaXTwitter,
    theme: 'dark',
    usesShareUrl: true,
  },
  {
    id: 'facebook',
    labelKey: null,
    label: 'Facebook',
    href: 'https://www.facebook.com/sharer/sharer.php?u=',
    icon: FaFacebookF,
    theme: 'facebook',
    usesShareUrl: true,
  },
];

function getShareHref(item, shareUrl) {
  if (!item.href) return '#';

  if (item.usesShareUrl && shareUrl) {
    const fullUrl =
      shareUrl.startsWith('http') ? shareUrl : `${typeof window !== 'undefined' ? window.location.origin : ''}${shareUrl}`;
    return `${item.href}${encodeURIComponent(fullUrl)}`;
  }

  return item.href;
}

export default function AboutShareBar({ className = '', shareUrl = '', ariaLabel }) {
  const { t } = useTranslation();
  const resolvedAriaLabel = ariaLabel ?? t('share.pageAria');
  const handleShareAction = async (event, item) => {
    if (item.id === 'print') {
      event.preventDefault();
      window.print();
      return;
    }

    if (item.id === 'share' && shareUrl && typeof navigator !== 'undefined' && navigator.share) {
      event.preventDefault();
      const fullUrl = shareUrl.startsWith('http')
        ? shareUrl
        : `${window.location.origin}${shareUrl}`;

      try {
        await navigator.share({ url: fullUrl });
      } catch {
        // User dismissed the share dialog.
      }
    }
  };

  return (
    <div className={['about-extended__share', className].filter(Boolean).join(' ')} aria-label={resolvedAriaLabel}>
      {SHARE_ACTION_IDS.map((item) => {
        const Icon = item.icon;
        const href = getShareHref(item, shareUrl);
        const actionLabel = item.labelKey ? t(item.labelKey) : item.label;

        return (
          <a
            key={item.id}
            href={href}
            className={['about-extended__share-btn', `about-extended__share-btn--${item.theme}`].join(' ')}
            aria-label={actionLabel}
            target={item.usesShareUrl && shareUrl ? '_blank' : item.href ? '_blank' : undefined}
            rel={item.usesShareUrl && shareUrl ? 'noopener noreferrer' : item.href ? 'noopener noreferrer' : undefined}
            onClick={(event) => {
              event.stopPropagation();
              handleShareAction(event, item);
            }}
          >
            {item.isCustomIcon ? <Icon /> : <Icon size={14} aria-hidden="true" />}
          </a>
        );
      })}
    </div>
  );
}
