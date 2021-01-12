import { format } from 'date-fns';

export const queryReport = async props => {
  const { viewID, startDate, endDate, metrics, dimensions, orderBy, filter } = props;

  const requestDimensions = dimensions => {
    let result = [];
    dimensions.forEach(item => {
      result.push({
        name: item,
      });
    });
    return result;
  };
  let res = await window.gapi.client.request({
    path: '/v4/reports:batchGet',
    root: 'https://analyticsreporting.googleapis.com/',
    method: 'POST',
    body: {
      reportRequests: [
        {
          viewId: viewID,
          filtersExpression: filter,
          dateRanges: [
            {
              startDate: format(new Date(startDate), 'yyyy-MM-dd'),
              endDate: format(new Date(endDate), 'yyyy-MM-dd'),
            },
          ],
          metrics: [
            {
              expression: metrics,
            },
          ],
          dimensions: requestDimensions(dimensions),
          orderBys: orderBy
            ? [
                {
                  fieldName: orderBy.fieldName,
                  sortOrder: orderBy.order,
                },
              ]
            : [],
        },
      ],
    },
  });
  console.log(res, 'RESPONSE');
  return res;
};
