import { useMemo } from 'react';

import { Navigate, useParams } from 'react-router-dom';

import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';

import { fetchCareerItem } from '@/services/api/careers.js';

import AboutShareBar from '../../about-us/AboutShareBar/AboutShareBar.jsx';

import InnerHero from '../../about-us/InnerHero/InnerHero.jsx';

import { getJobById, JOB_TYPES, JOBS_PAGE } from '../jobsData.js';

import './JobDetail.css';



function LocationIcon() {

  return (

    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">

      <path

        d="M9 1.5C6.1005 1.5 3.75 3.8505 3.75 6.75C3.75 10.6875 9 16.5 9 16.5C9 16.5 14.25 10.6875 14.25 6.75C14.25 3.8505 11.8995 1.5 9 1.5ZM9 8.625C7.96425 8.625 7.125 7.78575 7.125 6.75C7.125 5.71425 7.96425 4.875 9 4.875C10.0358 4.875 10.875 5.71425 10.875 6.75C10.875 7.78575 10.0358 8.625 9 8.625Z"

        fill="#008AA9"

      />

    </svg>

  );

}



function ClockIcon() {

  return (

    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">

      <path

        d="M9 1.5C5.025 1.5 1.875 4.65 1.875 8.625C1.875 12.6 5.025 15.75 9 15.75C12.975 15.75 16.125 12.6 16.125 8.625C16.125 4.65 12.975 1.5 9 1.5ZM9.75 9H12.75V10.5H8.25V5.25H9.75V9Z"

        fill="#008AA9"

      />

    </svg>

  );

}



function ContractIcon() {

  return (

    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">

      <path

        d="M3.75 2.25H14.25C14.6478 2.25 15.0294 2.40798 15.3107 2.68934C15.592 2.97064 15.75 3.35218 15.75 3.75V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40798 15.0294 2.25 14.6478 2.25 14.25V3.75C2.25 3.35218 2.40798 2.97064 2.68934 2.68934C2.97064 2.40798 3.35218 2.25 3.75 2.25ZM4.5 12.75H13.5V11.25H4.5V12.75ZM4.5 9.75H13.5V8.25H4.5V9.75ZM4.5 6.75H10.5V5.25H4.5V6.75Z"

        fill="#008AA9"

      />

    </svg>

  );

}



function SalaryIcon() {

  return (

    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">

      <path

        d="M9 1.5C5.025 1.5 1.875 4.65 1.875 8.625C1.875 12.6 5.025 15.75 9 15.75C12.975 15.75 16.125 12.6 16.125 8.625C16.125 4.65 12.975 1.5 9 1.5ZM9.375 12.375C8.19375 12.375 7.2375 11.4188 7.2375 10.2375C7.2375 9.05625 8.19375 8.1 9.375 8.1C10.5563 8.1 11.5125 9.05625 11.5125 10.2375C11.5125 11.4188 10.5563 12.375 9.375 12.375ZM6.075 6.75C6.54375 6.01875 7.36875 5.5125 8.325 5.38125V4.875H10.425V5.38125C11.3813 5.5125 12.2063 6.01875 12.675 6.75H6.075Z"

        fill="#008AA9"

      />

    </svg>

  );

}



function GraduationIcon() {

  return (

    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden="true">

      <path

        d="M8 0L0 4L8 8L16 4L8 0ZM8 10.5L2.66667 7.58333V10.5L8 13.4167L13.3333 10.5V7.58333L8 10.5Z"

        fill="#008AA9"

      />

    </svg>

  );

}



function SkillIcon({ type }) {

  if (type === 'data') {

    return (

      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">

        <path d="M2 12V4H5V12H2ZM6 12V2H9V12H6ZM10 12V6H13V12H10Z" fill="currentColor" />

      </svg>

    );

  }



  if (type === 'bilingual') {

    return (

      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">

        <path

          d="M7 13C5.34315 13 4 11.6569 4 10H10C10 11.6569 8.65685 13 7 13ZM1 9L2.5 7.5C3.5 6.5 4 5.5 4 4H10C10 5.5 10.5 6.5 11.5 7.5L13 9H1Z"

          fill="currentColor"

        />

      </svg>

    );

  }



  if (type === 'teams') {

    return (

      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">

        <path

          d="M5 6.5C6.38071 6.5 7.5 5.38071 7.5 4C7.5 2.61929 6.38071 1.5 5 1.5C3.61929 1.5 2.5 2.61929 2.5 4C2.5 5.38071 3.61929 6.5 5 6.5ZM11.5 6.5C12.6046 6.5 13.5 5.60457 13.5 4.5C13.5 3.39543 12.6046 2.5 11.5 2.5C10.3954 2.5 9.5 3.39543 9.5 4.5C9.5 5.60457 10.3954 6.5 11.5 6.5ZM1 12.5V11.5C1 9.84315 2.34315 8.5 4 8.5H5.2C5.73137 8.5 6.23137 8.63125 6.675 8.8625C6.2625 9.55625 6 10.3687 6 11.25V12.5H1ZM8 12.5V11.25C8 9.73125 9.23125 8.5 10.75 8.5H11.5C12.6046 8.5 13.5 9.39543 13.5 10.5V12.5H8Z"

          fill="currentColor"

        />

      </svg>

    );

  }



  if (type === 'research') {

    return (

      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">

        <path d="M6 1V3H8V1H6ZM3 4V6H1V4H3ZM13 4V6H11V4H13ZM3 8V10H1V8H3ZM13 8V10H11V8H13ZM6 11V13H8V11H6Z" fill="currentColor" />

      </svg>

    );

  }



  return (

    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">

      <path d="M2 2H12V12H2V2ZM3.5 3.5V10.5H10.5V3.5H3.5Z" fill="currentColor" />

    </svg>

  );

}



function DetailFact({ icon, label, value }) {

  if (!value) return null;



  return (

    <div className="job-detail__fact">

      <span className="job-detail__fact-icon">{icon}</span>

      <p className="job-detail__fact-text">

        <span className="job-detail__fact-label">{label}</span> {value}

      </p>

    </div>

  );

}



export default function JobDetail() {

  const { id } = useParams();

  const fallbackJob = useMemo(() => getJobById(id), [id]);

  const { data: drupalJob, loading } = useDrupalFetch(

    (lang) => fetchCareerItem(lang, id, fallbackJob),

    [id],

  );



  if (loading) {

    return null;

  }



  const resolvedJob = drupalJob ?? fallbackJob;



  if (!resolvedJob) {

    return <Navigate to="/jobs" replace />;

  }



  const jobType = JOB_TYPES[resolvedJob.type];

  const employmentLabel = jobType?.label || resolvedJob.employmentTypeLabel || '';

  const hasApplySection = Boolean(resolvedJob.applyDeadline || resolvedJob.applyEmail);

  const hasDetails =

    resolvedJob.details?.location ||

    resolvedJob.details?.workingHours ||

    resolvedJob.details?.contractType ||

    resolvedJob.details?.salary;



  return (

    <div className="job-detail-page">

      <InnerHero

        title={JOBS_PAGE.title}

        breadcrumbs={[

          { label: 'الرئيسية', to: '/' },

          { label: JOBS_PAGE.title, to: '/jobs' },

          { label: resolvedJob.title },

        ]}

        backgroundImage={JOBS_PAGE.heroImage}

      />



      <div className="job-detail-page__body">

        <div className="job-detail-page__inner">

          <div className="job-detail__layout">

            <div className="job-detail__main">

              <header className="job-detail__header">

                <div className="job-detail__tags">

                  {resolvedJob.location ? <span className="job-detail__tag">{resolvedJob.location}</span> : null}

                  {resolvedJob.field ? <span className="job-detail__tag">{resolvedJob.field}</span> : null}

                  {employmentLabel ? <span className="job-detail__tag">{employmentLabel}</span> : null}

                </div>

                <h1 className="job-detail__title">{resolvedJob.title}</h1>

              </header>



              {(resolvedJob.bodyHtml || resolvedJob.summary) ? (

                <section className="job-detail__section">

                  <h2 className="job-detail__section-title">ملخص الوظيفة</h2>

                  {resolvedJob.bodyHtml ? (

                    <div

                      className="job-detail__paragraph"

                      dangerouslySetInnerHTML={{ __html: resolvedJob.bodyHtml }}

                    />

                  ) : (

                    <p className="job-detail__paragraph">{resolvedJob.summary}</p>

                  )}

                </section>

              ) : null}



              {resolvedJob.tasks?.length ? (

                <section className="job-detail__section">

                  <h2 className="job-detail__section-title">المهام المطلوبة</h2>

                  <ul className="job-detail__tasks">

                    {resolvedJob.tasks.map((task) => (

                      <li key={task}>{task}</li>

                    ))}

                  </ul>

                </section>

              ) : null}



              {(resolvedJob.qualificationsIntro || resolvedJob.qualifications?.length) ? (

                <section className="job-detail__section">

                  <h2 className="job-detail__section-title">المؤهلات المطلوبة</h2>

                  <div className="job-detail__qualifications-box">

                    {resolvedJob.qualificationsIntro ? (

                      <p className="job-detail__paragraph">{resolvedJob.qualificationsIntro}</p>

                    ) : null}

                    {resolvedJob.qualifications?.length ? (

                      <ul className="job-detail__qualifications">

                        {resolvedJob.qualifications.map((item) => (

                          <li key={item}>

                            <GraduationIcon />

                            <span>{item}</span>

                          </li>

                        ))}

                      </ul>

                    ) : null}

                  </div>

                </section>

              ) : null}



              {resolvedJob.skills?.length ? (

                <section className="job-detail__section">

                  <h2 className="job-detail__section-title">المهارات</h2>

                  <div className="job-detail__skills">

                    {resolvedJob.skills.map((skill) => (

                      <span key={skill.id} className="job-detail__skill">

                        {skill.icon ? (
                          <img src={skill.icon} alt="" className="job-detail__skill-icon" />
                        ) : (
                          <SkillIcon type={skill.id} />
                        )}

                        <span>{skill.label}</span>

                      </span>

                    ))}

                  </div>

                </section>

              ) : null}

            </div>



            {(hasApplySection || hasDetails) ? (

              <aside className="job-detail__sidebar">

                {hasApplySection ? (

                  <div className="job-detail__apply-box">

                    <h2 className="job-detail__box-title">التقديم للوظيفة</h2>

                    {resolvedJob.applyDeadline ? (

                      <p className="job-detail__deadline">آخر موعد للتقديم: {resolvedJob.applyDeadline}</p>

                    ) : null}

                    {resolvedJob.applyEmail ? (

                      <>

                        <a href={`mailto:${resolvedJob.applyEmail}`} className="job-detail__apply-btn">

                          إرسال السيرة الذاتية

                        </a>

                        <a href={`mailto:${resolvedJob.applyEmail}`} className="job-detail__apply-email">

                          {resolvedJob.applyEmail}

                        </a>

                      </>

                    ) : null}

                  </div>

                ) : null}



                {hasDetails ? (

                  <div className="job-detail__info-box">

                    <h2 className="job-detail__box-title">تفاصيل الوظيفة</h2>

                    <div className="job-detail__facts">

                      <DetailFact icon={<LocationIcon />} label="الموقع:" value={resolvedJob.details.location} />

                      <DetailFact icon={<ClockIcon />} label="ساعات العمل:" value={resolvedJob.details.workingHours} />

                      <DetailFact icon={<ContractIcon />} label="نوع العقد:" value={resolvedJob.details.contractType} />

                      <DetailFact icon={<SalaryIcon />} label="الراتب:" value={resolvedJob.details.salary} />

                    </div>

                  </div>

                ) : null}

              </aside>

            ) : null}

          </div>

        </div>

      </div>



      <div className="job-detail-page__share-wrap">

        <AboutShareBar shareUrl={`/jobs/${resolvedJob.id}`} />

      </div>

    </div>

  );

}


