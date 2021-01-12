import React, { useState } from 'react';
import DayVisitsReport from './dayVisitsReport';
import CountriesReport from './countriesReport';
import PageviewsReport from './pageviewReport';
import SourceReport from './sourceReport';
import BrowsersReport from './browsersReport';
import DevicesReport from './devicesReport';
import Header from '../Components/header';
import { LastRow } from './styles';
import InputField from '../Components/input';

const DashBoard = () => {
  const [viewID, setViewID] = useState(`${process.env.REACT_APP_VIEW_ID}`);

  return (
    <>
      <Header />
      {viewID ? (
        <div className="container" style={{ marginTop: '10vh' }}>
          <DayVisitsReport metric={'ga:users'} title={'Users'} viewID={viewID} />
          <DayVisitsReport metric={'ga:sessions'} title={'Sessions'} viewID={viewID} />
          <CountriesReport viewID={viewID} />
          <PageviewsReport viewID={viewID} />
          <SourceReport viewID={viewID} />
          <LastRow>
            <BrowsersReport viewID={viewID} />
            <DevicesReport viewID={viewID} />
          </LastRow>
        </div>
      ) : (
        <InputField submitViewId={id => setViewID(id)} />
      )}
    </>
  );
};

export default DashBoard;
