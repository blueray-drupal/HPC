import { Fragment } from 'react';
import {
  INTERNATIONAL_DAYS_MONTHS,
  INTERNATIONAL_DAYS_TABLE_COLUMNS,
} from '../internationalDaysListData.js';
import './InternationalDaysTable.css';

export default function InternationalDaysTable() {
  return (
    <div className="international-days-table-wrap">
      <table className="international-days-table">
        <thead>
          <tr>
            {INTERNATIONAL_DAYS_TABLE_COLUMNS.map((column) => (
              <th key={column.id} scope="col">
                {column.label}
                {column.hasFootnote ? <span className="international-days-table__footnote">*</span> : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {INTERNATIONAL_DAYS_MONTHS.map((month) => (
            <Fragment key={month.number}>
              <tr className="international-days-table__month-row">
                <td rowSpan={month.days.length + 1} className="international-days-table__month-number">
                  {month.number}
                </td>
                <td colSpan={3} className="international-days-table__month-label">
                  {month.name}
                </td>
              </tr>
              {month.days.map((day, index) => (
                <tr key={`${month.number}-${index}`} className="international-days-table__day-row">
                  <td className="international-days-table__day-text">
                    <span className="international-days-table__bullet" aria-hidden="true" />
                    <span>{day.text}</span>
                  </td>
                  <td className="international-days-table__activity">
                    {day.hasActivity ? <span className="international-days-table__activity-mark">*</span> : null}
                  </td>
                  <td className="international-days-table__entity">{day.entity ?? ''}</td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>

      <p className="international-days-table__note">
        ملاحظة: تشير علامة (<span className="international-days-table__note-mark">✓</span>) في خانة الأنشطة
        المقترحة إلى أن المجلس يقوم أو يمكن أن يقوم بإحياء هذا اليوم.{' '}
        <span className="international-days-table__note-mark">✓</span> للتعاون في تنظيم الأنشطة يرجى
        التواصل مع المجلس.
      </p>
    </div>
  );
}
