import Script from 'next/script'
import { useConfig } from '@/lib/config'

const Scripts = () => {
  const BLOG = useConfig()

  return (
    <>
      {BLOG.analytics && BLOG.analytics.provider === "ga" && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${BLOG.analytics.gaConfig.measurementId}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('consent', 'default', {
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied',
                  'ad_storage': 'denied',
                  'analytics_storage': 'denied',
                  'wait_for_update': 500
                });
                
                gtag('config', '${BLOG.analytics.gaConfig.measurementId}', {
                    page_path: window.location.pathname,
                });
                dataLayer.push({'gtm.start': new Date().getTime(), 'event': 'gtm.js'});
                `,
            }}
          />
        </>
      )}
    </>
  );
};

export default Scripts;
