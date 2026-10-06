import { useMemo, useState } from 'react';

import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { useLanguage } from '@/hooks/useLanguage.js';
import { getSimpleInnerHeroMeta } from '@/i18n/innerHero.js';

import { fetchCareers } from '@/services/api/careers.js';

import AboutShareBar from '../about-us/AboutShareBar/AboutShareBar.jsx';

import InnerHero from '../about-us/InnerHero/InnerHero.jsx';

import JobsFilters from './JobsFilters/JobsFilters.jsx';

import JobsGrid from './JobsGrid/JobsGrid.jsx';

import { filterJobs, JOBS_ITEMS } from './jobsData.js';

import './Jobs.css';



export default function Jobs() {
  const { language } = useLanguage();
  const hero = useMemo(() => getSimpleInnerHeroMeta(language, 'common.jobs'), [language]);

  const { data, loading } = useDrupalFetch((lang) => fetchCareers(lang, JOBS_ITEMS));

  const items = data ?? JOBS_ITEMS;

  const [title, setTitle] = useState('');

  const [appliedTitle, setAppliedTitle] = useState('');



  const filteredItems = useMemo(

    () => filterJobs(items, { title: appliedTitle }),

    [items, appliedTitle],

  );



  const handleSubmit = (event) => {

    event.preventDefault();

    setAppliedTitle(title);

  };



  return (

    <div className="jobs-page">

      <InnerHero
        title={hero.title}
        breadcrumbs={hero.breadcrumbs}
        backgroundImage={hero.heroImage}
      />



      <div className="jobs-page__body">

        <div className="jobs-page__inner">

          <JobsFilters title={title} onTitleChange={setTitle} onSubmit={handleSubmit} />



          {!loading ? <JobsGrid items={filteredItems} /> : null}

        </div>

      </div>



      <div className="jobs-page__share-wrap">

        <AboutShareBar shareUrl="/jobs" />

      </div>

    </div>

  );

}

