import AboutShareBar from '../AboutShareBar/AboutShareBar.jsx';
import './EstablishmentExtended.css';

export default function EstablishmentExtended({ data }) {
  if (!data) return null;

  return (
    <section
      className="about-extended"
      style={{
        backgroundImage: `url(${data.backgroundImage})`,
        '--about-extended-bg-position': data.backgroundPosition ?? undefined,
        '--about-extended-bg-size': data.backgroundSize ?? undefined,
      }}
      aria-label="تفاصيل النشأة والتأسيس"
    >
      <div className="about-extended__inner">
        {data.htmlContent ? (
          <div
            className="about-extended__html"
            dangerouslySetInnerHTML={{ __html: data.htmlContent }}
          />
        ) : (
          <>
            <p className="about-extended__paragraph">
              {data.paragraphsBeforeLink[0]}{' '}
              {data.princessLink.prefix}{' '}
              <a href={data.princessLink.href} target="_blank" rel="noopener noreferrer">
                {data.princessLink.label}
              </a>
            </p>

            {data.paragraphsAfterLink.map((paragraph) => (
              <p key={paragraph} className="about-extended__paragraph">
                {paragraph}
              </p>
            ))}
          </>
        )}

        {data.members?.length ? (
          <>
            {data.councilTitle ? (
              <h3 className="about-extended__council-title">{data.councilTitle}</h3>
            ) : null}
            {data.councilIntro ? (
              <p className="about-extended__council-intro">{data.councilIntro}</p>
            ) : null}

            <ul className="about-extended__members">
              {data.members.map((member) => (
                <li key={member}>{member}</li>
              ))}
            </ul>
          </>
        ) : null}

        <AboutShareBar />
      </div>
    </section>
  );
}
