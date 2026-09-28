import { useMemo, useState } from 'react';

import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';

import { fetchCareers } from '@/services/api/careers.js';

import AboutShareBar from '../about-us/AboutShareBar/AboutShareBar.jsx';

import InnerHero from '../about-us/InnerHero/InnerHero.jsx';

import JobsFilters from './JobsFilters/JobsFilters.jsx';

import JobsGrid from './JobsGrid/JobsGrid.jsx';

import { filterJobs, JOBS_ITEMS, JOBS_PAGE } from './jobsData.js';

import './Jobs.css';



export default function Jobs() {

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

        title={JOBS_PAGE.title}

        breadcrumbs={JOBS_PAGE.breadcrumbs}

        backgroundImage={JOBS_PAGE.heroImage}

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

